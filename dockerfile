# ===========================
# ETAPA 1 — BUILD (PHP + NODE)
# ===========================
FROM php:8.2-fpm AS build

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV APP_ENV=production
ENV APP_DEBUG=false

WORKDIR /var/www

# Dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libpng-dev libpq-dev libonig-dev curl \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip mbstring gd

# Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia PROJETO INTEIRO primeiro (artisan precisa existir)
COPY . .

# NPM deps + build
RUN npm ci

# PHP deps
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --prefer-dist \
    --no-interaction

RUN npm run build

# Cache
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

RUN cp -r public/build /var/www/html/public/

# # Permissões
RUN chown -R www-data:www-data /var/www

# ===========================
# ETAPA 2 — RUNTIME
# ===========================
FROM php:8.2-fpm

ENV APP_ENV=production
ENV APP_DEBUG=false

RUN apt-get update && apt-get install -y \
    libzip-dev libpng-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip mbstring gd

WORKDIR /var/www

COPY --from=build /var/www /var/www

USER www-data

EXPOSE 9000
CMD ["php-fpm"]

