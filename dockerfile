# ===========================
# ETAPA 1 — BUILD (PHP + NODE)
# ===========================
FROM php:8.2-fpm AS build

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV APP_ENV=production
ENV APP_DEBUG=false

WORKDIR /var/www

# Dependências de sistema necessárias para composer, php-ext e node build
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libpq-dev libonig-dev curl gnupg2 ca-certificates \
    libfreetype6-dev libjpeg62-turbo-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Configura e instala extensões PHP (compila GD com FreeType/JPEG)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_pgsql pgsql zip mbstring \
    && apt-get purge -y --auto-remove build-essential libfreetype6-dev libjpeg62-turbo-dev \
    && rm -rf /var/lib/apt/lists/*

# Node.js 22 (instalação via NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Composer bin (copy do stage oficial)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia project (inclui package.json, composer.json, etc.)
COPY . .

# Instala dependências JS e constrói assets
RUN if [ -f package-lock.json ] || [ -f yarn.lock ]; then npm ci; else npm install; fi

# Instala dependências PHP (produção)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --prefer-dist \
    --no-interaction

RUN npm run build || echo "npm run build retornou não-zero (verifique scripts)"

# Cache de artisan (se aplicável)
RUN php artisan config:cache || true
RUN php artisan route:cache || true
RUN php artisan view:cache || true

# ===========================
# ETAPA 2 — RUNTIME
# ===========================
FROM php:8.2-fpm

ENV APP_ENV=production
ENV APP_DEBUG=false

# Instala apenas pacotes necessários em runtime e compila as extensões. 
# (Recompilando aqui para garantir que a imagem runtime tenha gd ativo)
RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libpq-dev libonig-dev \
    libfreetype6 libfreetype6-dev \
    libjpeg62-turbo libjpeg62-turbo-dev \
    libpng16-16 \
    build-essential \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_pgsql pgsql zip mbstring \
    && apt-get purge -y --auto-remove build-essential libfreetype6-dev libjpeg62-turbo-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

# Copia código PHP + vendor do stage build
COPY --from=build /var/www /var/www

USER www-data

EXPOSE 9000
CMD ["php-fpm"]