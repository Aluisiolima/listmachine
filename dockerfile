# ===========================
# ETAPA 1 — BUILD (PHP + NODE)
# ===========================
FROM php:8.2-fpm AS build

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV APP_ENV=production
ENV APP_DEBUG=false

WORKDIR /var/www

# Dependências de sistema necessárias para composer, php-ext e node build
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       git unzip libzip-dev libpng-dev libpq-dev libonig-dev curl gnupg2 ca-certificates \
       libfreetype6-dev libjpeg62-turbo-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Configura e instala extensões PHP (compila GD com FreeType/JPEG)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" gd pdo pdo_pgsql pgsql zip mbstring \
    && apt-get purge -y --auto-remove build-essential libfreetype6-dev libjpeg62-turbo-dev \
    && rm -rf /var/lib/apt/lists/*

# Node.js 22 (instalação via NodeSource)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get update \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# Composer bin (copy do stage oficial)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia project (inclui package.json, composer.json, etc.)
COPY . .

# Instala dependências JS (suporta npm e yarn)
RUN if [ -f package-lock.json ]; then \
        npm ci --no-audit --prefer-offline; \
    elif [ -f yarn.lock ]; then \
        npm install -g yarn && yarn install --frozen-lockfile; \
    else \
        npm install; \
    fi

# Instala dependências PHP (produção)
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --prefer-dist \
    --no-interaction \
    --no-scripts

# Build dos assets — não interrompe a build se falhar (avisa)
RUN if npm run build; then echo "npm build ok"; else echo "npm run build retornou != 0 — continuar"; fi

# Executa caches do Laravel (se presentes). Falhas não quebram a imagem
RUN set -e; \
    if command -v php >/dev/null 2>&1 && [ -f artisan ]; then \
        php artisan config:cache || true; \
        php artisan route:cache || true; \
        php artisan view:cache || true; \
    fi

# Copia os arquivos públicos para uma pasta dedicada que será montada no volume
# usa cp -a para copiar inclusive arquivos ocultos dentro de public
RUN mkdir -p /build_public \
    && if [ -d public ] && [ "$(ls -A public)" ]; then cp -a public/. /build_public/ || true; fi

# Ajusta permissões
RUN chown -R www-data:www-data /var/www /build_public || true

# ===========================
# ETAPA 2 — RUNTIME
# ===========================
FROM php:8.2-fpm AS runtime

ENV APP_ENV=production
ENV APP_DEBUG=false

WORKDIR /var/www

# Instala apenas pacotes necessários em runtime para as extensões.
# Como precisamos compilar extensões (GD etc.), instalamos temporariamente build-essential e em seguida removemos.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libzip-dev libpng-dev libpq-dev libonig-dev \
       libfreetype6 libjpeg62-turbo libpng16-16 \
       libfreetype6-dev libjpeg62-turbo-dev build-essential \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" gd pdo pdo_pgsql pgsql zip mbstring \
    && apt-get purge -y --auto-remove build-essential libfreetype6-dev libjpeg62-turbo-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia código + vendor do stage build
COPY --from=build /var/www /var/www

USER www-data

EXPOSE 9000
CMD ["php-fpm"]
