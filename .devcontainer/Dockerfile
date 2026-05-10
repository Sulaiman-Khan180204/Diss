FROM mcr.microsoft.com/devcontainers/php:1-8.2-bookworm

RUN rm -f /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y mariadb-client \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli pdo pdo_mysql
