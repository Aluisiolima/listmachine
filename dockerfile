# ===========================
# ETAPA 1 — BUILD (PHP + NODE)
# ===========================
FROM php:8.2-fpm AS build

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV APP_ENV=production
ENV APP_DEBUG=false

WORKDIR /var/www

# Dependências do sistema necessárias para composer, php-ext e node build
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libpq-dev libonig-dev curl gnupg2 ca-certificates \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip mbstring gd \
    && rm -rf /var/lib/apt/lists/*

# Node.js 22 (instalação via NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
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

# Copia os arquivos públicos para uma pasta dedicada que será montada no volume
RUN mkdir -p /build_public && cp -r public/* /build_public/ || true

# Ajusta permissões
RUN chown -R www-data:www-data /var/www /build_public

# ===========================
# ETAPA 2 — RUNTIME
# ===========================
FROM php:8.2-fpm

ENV APP_ENV=production
ENV APP_DEBUG=false

RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip mbstring gd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

# Copia código PHP + vendor do stage build
COPY --from=build /var/www /var/www

# Copia public compilado para /var/www/html/public (ponto que será compartilhado com o volume)
RUN mkdir -p /var/www/html/public
COPY --from=build /build_public/ /var/www/html/public/

# Ajusta permissões
RUN chown -R www-data:www-data /var/www /var/www/html/public

USER www-data

EXPOSE 9000
CMD ["php-fpm"]
