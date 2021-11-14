# Einleitung

Dies ist der Code für die Website vom aka-Filmclub Freiburg e.V., erreichbar unter https://www.aka-filmclub.de/.

Diese Readme enthält Erklärungen zum Technologie-Stack und zur Progammierung. Dabei wird besonders auf die Dinge eingegangen, die vom Standard abweichen. Wie die zugrundeliegenden Frameworks funktionieren, ist deren jeweiliger Dokumentation zu entnehmen.

Außerdem wird erklärt, was nötig ist, um die App lokal installieren.

## Grundlegendes Setup

Das Backend der Website ist mit [Laravel](https://laravel.com/) gebaut, das Frontend mit [React](https://reactjs.org/).

Es handelt sich um eine [Single-Page-Applicaton (SPA)](https://de.wikipedia.org/wiki/Single-Page-Webanwendung), d.h. beim Aufruf der Website wird das gesamte Frontend als JavaScript-Anwendung an den Browser geschickt. Beim Navigieren oder anderen Interaktionen fragt das Frontend nur noch Daten vom Backend ab bzw. schickt Daten ans Backend.

# Installation und Entwicklung

## Voraussetzungen

Damit die App lokal läuft, muss folgendes installiert sein:

-   [PHP](https://www.php.net/) (7.4, 8)
-   eine SQL-Datenbank z.B. [MariaDB](https://mariadb.org/) (10.1)
-   ein Webserver, z.B. [Apache](https://httpd.apache.org/) (2.4)

Zur Entwicklung ist außerdem notwendig:

-   [Node.js](https://nodejs.org/en/) (14.5)

In Klammern stehen die Versionen, mit denen die App getestet wurde. Es kann sein, dass sie auch mit älteren oder neueren Versionen läuft.

## Installation

Da die Vendor-Biblitheken mit im Repository liegen (Erklärung dazu [hier](#vendor-ordner)), muss Laravel nicht extra installiert werden. Die App ist praktisch sofort lauffähig. Es müssen nur die folgenden Dinge erledigt werden:

### env

Die Werte im env-File müssen angepasst werden. Ein Beispiel-env-File liegt als _env.example_ im Repository. Siehe dazu [hier](https://laravel.com/docs/8.x#environment-based-configuration) und [hier](https://laravel.com/docs/8.x/configuration).

### Datenbank

Die Datenbank-Tabellen für die Website müssen erzeugt werden. Das geht mit dem Befehl `php artisan migrate`.

TODO: Reihenfolge der Migrations überprüfen und Seeder für texts schreiben.

Für die User-Administration wird darüberhinaus die Forums-Datenbank benötigt (siehe dazu...). Die Tabellen für die Forums-Datenbank sind [hier](https://wiki.phpbb.com/Tables) gelistet. Die einfachste Möglichkeit, die Datenbank einzurichten, ist es wohl, sich ein phpBB-Forum lokal zu installieren.

### Webserver

Der Webserver muss auf den _/public_-Ordner zeigen.

### Verlinkung Storage-Ordner

...

## Entwicklung

### Versionsverwaltung mit Git

Zur Versionsverwaltung wird [Git](https://git-scm.com/) verwendet. Im Folgenden sind ein paar Besonderheiten beschrieben.

#### _vendor_-Ordner

Normalerweise würde man einen Ordner mit Fremd-Bibliotheken wie den _vendor_-Ordner nicht in die Versionsverwaltung einchecken. Das ist hier aber nötig, weil die App direkt über Git auf den Webserver des Website-Hosts geladen wird und es dort keine Möglichkeit gibt, die Bibliotheken wiederherzustellen (weil z.B. Composer nicht auf dem Webserver installiert ist).

#### _app.js_-Datei

Die Datei _app.js_, die das kompilierte Frontend enthält, würde man eigentlich auch nicht mit einchecken. Dass es dennoch so ist, hat einen ähnlichen Grund wie beim _vendor_-Ordner: Es gibt keine Möglichkeit die Datei auf dem Webserver zu kompilieren.

#### Branches

Es gibt die zwei Branches _main_ und _prod_. Sie unterscheiden sich nur dadurch, wie die _app.js_-Datei kompiliert wurde, ob im _dev_- oder im _prod_-Modus (siehe dazu [hier](#laravel-mix-und-npm)). Für die Entwicklung ist der _main_-Branch gedacht.

### Laravel Mix und NPM

Das Frontend wird mithilfe von [Laravel Mix](https://laravel.com/docs/8.x/mix) kompiliert. Die Konfiguration von Mix liegt in der Datei _webpack.mix.js_.

Vor dem erstmaligen Verwenden der App muss einmal der Befehl `npm install` ausgeführt werden.

Die anderen für diese App relevanten NPM-Befehle (die sich auch in der _package.json_ finden) sind:

-   `npm run dev`: Kompiliert das Frontend.
-   `npm run watch`: Überwacht Änderungen im Code und kompiliert das Frontend automatisch bei jeder Änderung.
-   `npm run prod`: Kompiliert das Frontend und minifiziert das Output-File.

# Laravel-Backend

## Routes

Die Web-Routes sind in der Datei _routes/web.php_ definiert. Es gibt nur zwei:

-   Die obere ist ein Spezialfall: Unter _/files_ lassen sich Dateien zum Download hinterlegen, siehe dazu [hier](https://laravel.com/docs/8.x/responses#file-responses).
-   Auf allen anderen Routes, die nicht mit _api_ beginnen, wird der _index_-View zurückgegeben, über den dann die React-App geladen wird.

Die Api-Routes sind in der Datei _routes/api.php_ definiert und nach Ressourcen gruppiert.

Zum Routing siehe: https://laravel.com/docs/8.x/routing.

## Authentifizierung

Zur Authentifizierung wird [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum#introduction) verwendet. Siehe insbesondere den Abschnitt zu [SPA Authentication](https://laravel.com/docs/8.x/sanctum#spa-authentication) in der Doku.

Die Authentifizierung ist manuell implementiert, ausgehend von [dieser Beschreibung](https://laravel.com/docs/8.x/authentication#authenticating-users). Sie findet sich in _app/Http/Controllers/UserController.php_. Sie ist so eingerichtet, dass ein User nach 5 fehlgeschlagenen Login-Versuchen für 10 Minuten gesperrt wird.

Für die Speicherung der Session wurde die Datenbank gewählt, siehe dazu: https://laravel.com/docs/8.x/session#introduction

## Authorisierung und Validierung

Authorisierung und Validierung sind mit [Form Requests](https://laravel.com/docs/8.x/validation#form-request-validation) implementiert.

## Middleware für Sharing

TODO: Sharen auf WhatsApp

Fürs Sharen auf Facebook, Telegram und Twitter gibt es eine eigene [Middleware](https://laravel.com/docs/8.x/middleware), die unter _app/Http/Middleware/SendJustMetaWhenSharing.php_ zu finden ist.

Die Middleware checkt den User-Agent des Requests. Wenn dieser zu einer der genannten Websites/Apps gehört, werden nur passende Meta-Daten zurückgegeben. Ansonsten nimmt der Request seinen normalen Lauf.

Zur Erklärung: Normalerweise würde man die Meta-Daten in den Head der jeweiligen HTML-Seite schreiben, wie hier in der Doku des [Open Graph Protokolls](https://ogp.me/#metadata) beschrieben. Das ist bei einer SPA jedoch nicht ohne Weiteres möglich, da die HTML-Seiten dynamisch erzeugt werden. Daher werden die Requests wie beschrieben abgefangen.

# React-Frontend

Der gesamte Quellcode fürs Frontend findet sich in _/resources/js_.

Im Folgenden wird die Einbindung

##

# Sonstiges

## Favicons

Die Favicons (einschließlich diverser Icons für spezielle Betriebssysteme und Geräte) wurden mit [RealFaviconGenerator](https://realfavicongenerator.net/) erstellt und liegen im public-Ordner. Dort liegt auch eine (vom RealFaviconsGenerator erstellte) _README_favicons.md_.
