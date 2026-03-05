# TWCC - The World Coordinate Converter

## Project Summary

TWCC is a web application for converting geodetic coordinates across a wide range of reference systems. It features an interactive map, user-defined coordinate systems, and a REST web service.

- License: AGPL-3.0
- Author: Clément Ronzon
- Homepage: https://twcc.fr

## Tech Stack

- Backend: PHP 8.0 (Apache)
- Database: MySQL 8.0
- Frontend: jQuery UI, OpenLayers (v9), proj4js, Browserify + Babel
- Build: Grunt (root-level JS/CSS concat, uglify, cssmin), Browserify (webapp-level bundling)
- Dependency management: Composer (PHP), npm (JS)
- Containerization: Docker + Docker Compose

## Project Structure

```
├── Gruntfile.js              # Root build: concat, uglify, cssmin, replace
├── package.json              # Root devDependencies (Grunt plugins)
├── docker-compose.yml        # PHP + MySQL + Composer services
├── Dockerfile                # php:8.0-apache image
├── migration/                # SQL migration files (applied on DB init)
├── webapp/
│   ├── index.php             # Main entry point (full app)
│   ├── light.php             # Lightweight version
│   ├── login.php / logout.php / register.php  # Auth pages
│   ├── rss.php               # RSS feed
│   ├── package.json          # Frontend deps (ol, proj4, browserify)
│   ├── js/
│   │   ├── map.js, main.js, converter.class.js  # Browserify entry points
│   │   ├── bundle.js         # Browserify output
│   │   ├── ui.js, converter.js, history.js, math.js, analytics.js
│   │   ├── vendor/           # jQuery, jQuery UI, clipboard, etc.
│   │   └── dist/             # Grunt output (concat + uglify)
│   ├── css/
│   │   ├── all.css           # Main stylesheet
│   │   ├── all.merged.css    # Merged with vendor CSS
│   │   └── dist/             # Minified output
│   ├── pieces/               # PHP template partials (header, converter, etc.)
│   ├── includes/
│   │   ├── application_top.php   # Bootstrap: env detection, DB connect, session, language
│   │   ├── configure.php         # Production config (constants, API keys)
│   │   ├── configure.local.php   # Local/dev config overrides
│   │   ├── functions/
│   │   │   ├── database.mysqli.php  # MySQLi database functions (tep_db_*)
│   │   │   ├── general.php
│   │   │   └── constants.php
│   │   ├── classes/language.php
│   │   ├── languages/            # i18n: en.php, fr.php, es.php, de.php, ar.php, etc.
│   │   ├── api/api.php           # PHP CRUD API (REST interface for DB tables)
│   │   ├── vendor/               # Composer deps (proj4php, mobiledetect)
│   │   └── cache/                # JSON cache files per language
│   ├── ws/index.php              # Web service endpoint (coordinate conversion)
│   └── admin/                    # Admin panel (donors, phpinfo)
```

## Key Architectural Patterns

- The app bootstraps via `includes/application_top.php` which detects dev/prod environment, loads config, connects to DB, initializes sessions and language.
- Dev environment is detected by checking `$_SERVER['HTTP_HOST']` against localhost variants.
- Database access uses procedural MySQLi functions (`tep_db_query`, `tep_db_fetch_array`, etc.) derived from osCommerce.
- The REST API (`includes/api/api.php`) is a standalone PHP CRUD API with its own MySQLi connection layer.
- Frontend JS is bundled via Browserify (map.js, main.js, converter.class.js → bundle.js), then Grunt concatenates vendor + app JS and uglifies.
- Internationalization uses PHP language files with constants (e.g., `languages/en.php`).
