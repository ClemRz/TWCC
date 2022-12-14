# pull official base image
FROM php:8.0-apache

# update aptitude
RUN apt-get update

# install git
RUN apt-get install -y --force-yes git

# install some extentions
RUN docker-php-ext-install pdo pdo_mysql mysqli
RUN a2enmod rewrite

# copy the sources
COPY webapp/ /var/www/html/

# port exposure
EXPOSE 80