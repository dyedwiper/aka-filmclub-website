# Einleitung

Dies ist der Code für die Website vom aka-Filmclub Freiburg e.V., erreichbar unter https://www.aka-filmclub.de/.

Diese Readme enthält Erklärungen zum Technologie-Stack und zur Progammierung. Dabei wird besonders auf die Dinge eingegangen, die vom Standard abweichen. Wie die zugrundeliegenden Frameworks funktionieren, ist deren jeweiliger Dokumentation zu entnehmen.

Außerdem wird erklärt, was nötig ist, um die App lokal zu installieren.

# Grundlegendes Setup

Das Backend der Website ist mit [Laravel](https://laravel.com/) gebaut, das Frontend mit [React](https://reactjs.org/).

Es handelt sich um eine [Single-Page-Applicaton](https://de.wikipedia.org/wiki/Single-Page-Webanwendung), d.h. beim Aufruf der Website wird das gesamte Frontend als JavaScript-Anwendung an den Browser geschickt. Beim Navigieren oder anderen Interaktionen fragt das Frontend nur noch Daten vom Backend ab bzw. schickt Daten ans Backend.

# Installation und Entwicklung

## Voraussetzungen

Damit die App lokal läuft, muss folgendes installiert sein:

-   [PHP](https://www.php.net/) (7.4, 8)
-   eine MySQL-Datenbank z.B. [MariaDB](https://mariadb.org/) (10.1)
-   ein Webserver, z.B. [Apache](https://httpd.apache.org/) (2.4)

Zur Entwicklung ist außerdem notwendig:

-   [Node.js](https://nodejs.org/en/) (14.5)

In Klammern stehen die Versionen, mit denen die App getestet wurde. Es kann sein, dass sie auch mit älteren oder neueren Versionen läuft.

## Installation

Da die Vendor-Biblitheken mit im Repository liegen (Erklärung dazu hier), muss Laravel nicht extra installiert werden. Die App ist praktisch sofort lauffähig. Es muss nur ein env-File hinterlegt, die Datenbank eingerichtet und der Webserver konfiguriert werden.

### env

Ein Beispiel-env-File liegt als _env.example_ im Repository. Die Werte in diesem File müssen angepasst werden. Siehe dazu: https://laravel.com/docs/8.x/configuration

### Datenbank

Mit dem Befehl `php artisan migrate` werden die nötigen Tabellen für die Website erstellt. Die Forum-Datenbank ist nur für die User-Administration nötig (siehe dazu...); alles andere läuft auch ohne sie. Die Tabellen für die Forum-Datenbank sind [hier](https://wiki.phpbb.com/Tables) gelistet.

## Entwicklung

### npm-Skripte

### Warum der vendor-Ordner eingecheckt ist

# Backend

## Routes

# Frontend

Der gesamt Quellcode fürs Frontend findet sich in _/resources/js_.

Im Folgenden wird die Einbindung

##
