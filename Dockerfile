# pull official base image
FROM php:8.0-apache

# bullseye is EOL: its packages now live on archive.debian.org
RUN sed -i -e 's|deb.debian.org/debian-security|archive.debian.org/debian-security|g' \
        -e 's|deb.debian.org/debian|archive.debian.org/debian|g' \
        -e '/bullseye-updates/d' /etc/apt/sources.list \
    && echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99archive

# install git
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# install some extentions
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN a2enmod rewrite

# copy the sources
COPY webapp/ /var/www/html/

# port exposure
EXPOSE 80