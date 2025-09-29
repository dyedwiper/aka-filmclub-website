# Website des aka-Filmclub

## Einleitung

Dies ist der Code für die Website vom aka-Filmclub Freiburg e.V., erreichbar unter https://www.aka-filmclub.de/.

Diese Readme enthält Erklärungen zum Technologie-Stack und zur Progammierung. Dabei wird besonders auf die Dinge eingegangen, die vom Standard abweichen.

Außerdem wird erklärt, was nötig ist, um die App lokal zu installieren.

### Grundlegendes Setup

Das Backend der Website ist mit [Laravel](https://laravel.com/) gebaut, das Frontend mit [React](https://reactjs.org/).

Es handelt sich um eine [Single-Page-Applicaton (SPA)](https://de.wikipedia.org/wiki/Single-Page-Webanwendung).

## Installation und Entwicklung

### Installation

Am einfachsten lässt sich die App lokal mit [Laravel Sail](https://laravel.com/docs/11.x/sail) einrichten.

Es ist empfehlenswert sich ein Alias für das Sail-Script anzulegen, wie [hier](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias) beschrieben. Bei den unten angegebenen Befehlen wird davon ausgegangen, dass dieses Alias angelegt ist.

#### Docker installieren

Mit Laravel Sail läuft die App in einem Docker-Container. Damit das funktioniert, muss [Docker](<https://de.wikipedia.org/wiki/Docker_(Software)>) installiert sein. Das geht auf verschiedenen Wegen. Hier zwei Möglichkeiten:

-   [Docker Desktop installieren](https://www.docker.com/products/docker-desktop/), das eine grafische Benutzerfläche enthält.
-   [Docker Engine installieren](https://docs.docker.com/engine/install/), die keine grafische Benutzeroberfläche enthält.

#### App einrichten

Wenn Docker installiert ist, kann die App eingerichtet werden. Dazu sind folgende Schritte in dieser Reihenfolge nötig. (Bei Veränderung der Reihenfolge einiger Schritte treten Fehler auf.)

<!-- Prettier formatiert die Unterstriche in Punkt 3 falsch. Und man kann nur die ganze Liste ignorieren. -->
<!-- prettier-ignore -->
1.  Den [hier](https://laravel.com/docs/11.x/sail#installing-composer-dependencies-for-existing-projects) genannten Befehl ausführen, um die benötigten Composer Dependencys zu installieren. (Die Auswahl der richtigen PHP-Version beachten!)
2.  Auf oberster Ebene im Repository eine Datei _.env_ anlegen und den Inhalt von _.env.example_ in die Datei kopieren. Erklärungen finden sich [hier](https://laravel.com/docs/11.x#environment-based-configuration) und [hier](https://laravel.com/docs/11.x/configuration) in der Laravel-Doku.
3.  `sail up` ausführen und die Container laufen lassen.
4.  `sail artisan key:generate` ausführen, um einen  APP_KEY in _.env_ einzutragen.
5.  `sail artisan migrate` ausführen, um die Datenbank-Tabellen zu erstellen.
6.  `sail artisan db:seed` ausführen, um einige notwendige Werte in die Datenbank zu schreiben. Dadurch werden auch die User "armin", "edith", und "otto" erzeugt - jeweils mit gleichlautendem Passwort.
7.  `sail artisan storage:link` ausführen, um die Interaktion mit dem Dateisystem einzurichten, siehe [hier](https://laravel.com/docs/11.x/filesystem#the-public-disk).

Jetzt sollte die App unter http://localhost erreichbar sein und funktionieren.

#### Forum einrichten (optional)

Falls die [Verbindung zum Forum](#verbindung-zum-forum) lokal getestet werden soll, muss dafür eine zusätzliche Datenbank eingerichtet werden. Die einfachste Möglichkeit die Datenbank einzurichten, ist wohl ein phpBB-Forum lokal zu installieren.

### Entwicklung

#### Versionsverwaltung mit Git

Der Hauptbranch heißt _main_. In diesem liegt der produktive Code, d.h. es dürfen keine Zwischenstände auf _main_ commited werden.

Für größere Entwicklungen sollte ein feature-Branch abgezweigt und über einen Pull Request bei GitHub gemerget werden.

#### Laravel Mix und npm

Das Frontend wird mithilfe von [Laravel Mix](https://laravel.com/docs/11.x/mix) kompiliert. Die Konfiguration von Mix liegt in der Datei _webpack.mix.js_.

Node.js und npm sind im Sail-Container installiert. Der Einfachheit halber empfiehlt es sich aber Node.js lokal zu installieren, am besten mit [nvm](https://github.com/nvm-sh/nvm). Die angegebenen npm-Befehle beziehen sich auf eine lokale Installation. Ohne lokale Installation muss man `sail` vor jeden Befehl hängen.

Vor dem erstmaligen Verwenden der App muss einmal der Befehl `npm install` ausgeführt werden.

Die anderen für die App relevanten npm-Befehle finden sich in der _package.json_.

## Backend

### Routes

Die Web-Routes sind in der Datei _routes/web.php_ definiert. Es gibt nur zwei:

-   Die obere ist ein Spezialfall: Unter _/files_ lassen sich Dateien zum Download hinterlegen, siehe dazu [hier](https://laravel.com/docs/11.x/responses#file-responses).
-   Auf allen anderen Routes, die nicht mit _api_ beginnen, wird der _index_-View zurückgegeben, über den dann die React-App geladen wird.

Die Api-Routes sind in der Datei _routes/api.php_ definiert und nach Ressourcen gruppiert.

Zum Routing siehe: https://laravel.com/docs/11.x/routing.

### Authentifizierung

Zur Authentifizierung wird [Laravel Sanctum](https://laravel.com/docs/11.x/sanctum) verwendet. Siehe insbesondere den Abschnitt zu [SPA Authentication](https://laravel.com/docs/11.x/sanctum#spa-authentication) in der Doku.

Die Authentifizierung ist manuell implementiert, ausgehend von [dieser Beschreibung](https://laravel.com/docs/11.x/authentication#authenticating-users). Sie findet sich in _app/Http/Controllers/UserController.php_. Sie ist so eingerichtet, dass der Login nach _x_ fehlgeschlagenen Anmeldeversuchen für _y_ Minuten für den jeweiligen User blockiert wird. _x_ und _y_ können im env-File eingestellt werden.

Für die Speicherung der Session wurde die Datenbank gewählt, siehe dazu: https://laravel.com/docs/11.x/session

### Authorisierung und Validierung

Authorisierung und Validierung sind mit [Form Requests](https://laravel.com/docs/11.x/validation#form-request-validation) implementiert.

### Upload von Bildern

Auf der Website können Bilder hochgeladen werden, die wie [hier](https://laravel.com/docs/11.x/filesystem#file-uploads) beschrieben gespeichert werden.

### Middleware für Sharing

Fürs Sharen auf Facebook, Telegram, WhatsApp, Signal, etc. gibt es eine eigene [Middleware](https://laravel.com/docs/11.x/middleware), die unter _app/Http/Middleware/SendJustMetaWhenSharing.php_ zu finden ist.

Die Middleware checkt den User-Agent des Requests. Wenn dieser zu einer der genannten Websites/Apps gehört, werden nur passende Meta-Daten zurückgegeben. Ansonsten nimmt der Request seinen normalen Lauf.

Zur Erklärung: Normalerweise würde man die Meta-Daten in den Head der jeweiligen HTML-Seite schreiben, wie hier in der Doku des [Open Graph Protokolls](https://ogp.me/#metadata) beschrieben. Das ist bei einer SPA jedoch nicht ohne Weiteres möglich, da die HTML-Seiten dynamisch erzeugt werden. Daher werden die Requests wie beschrieben abgefangen.

### Verbindung zum Forum

Über die User-Administration auf der Website können auch die User eines angeschlossenen [phpBB-Forums](https://www.phpbb.de/) administriert werden.

Im env-File gibt es den Config-Schalter _IS_FORUM_CONNECTED_. Dieser steuert, ob vom UserController der ForumUserService aufgerufen wird.

Falls diese Funktionalität genutzt werden soll, muss im env-File die Datenbankverbindung zum Forum hinterlegt werden.

### Konstanten

Konstanten, die in der ganzen App zur Verfügung stehen sollen, sind in _config/constants.php_ hinterlegt.

## Frontend

Der gesamte Quellcode fürs Frontend findet sich in _/resources/js_. Der Code der React-App liegt dort im Ordner _react-app_.

Das Frontend ist wie [oben beschrieben](#grundlegendes-setup) eine mit React gebaute SPA.

### _app.js_ und _bootstrap.js_

Die Dateien _app.js_ und _bootstrap.js_ im Ordner _resources/js_ sind Dateien aus dem Standard-Setup von Laravel. In _app.js_ wird der JavaScript-Code gesammelt, der von [Laravel Mix](https://laravel.com/docs/11.x/mix) kompiliert wird. In _bootstrap.js_ steht globale Konfiguration - momentan nur für [Axios](https://axios-http.com/docs/intro).

### Gerüst der React-App

Das Gerüst der React-App lehnt sich an das Gerüst an, das standardmäßig von [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) für eine neue App erzeugt wird. Der Eintrittspunkt ist in _index.js_, wo die App-Komponente ins DOM gerendert wird. Die App-Komponente befindet sich der Datei _App.js_ und enthält alle weiteren Komponenten.

### Ordner-Struktur

-   _pages_ enthält die React-Komponenten, die Seiten entsprechen.

-   _common_ enthält alle React-Komponenten, die nicht Seiten entsprechen.

-   _services_ enthält Funktionen zum Aufruf des Backends.

-   _utils_ enthält zusätzliche JavaScript-Funktionalität.

-   _styles_ enthält Dateien, die CSS-Styles betreffen.

-   _assets_ enthält statische Dateien, die in der App verwendet werden.

### Verwendete React-Funktionalität

Die React-App ist mit [React Function Components](https://www.robinwieruch.de/react-function-component/) und [Hooks](https://reactjs.org/docs/hooks-intro.html) geschrieben.

Um State in der ganzen App verfügbar zu machen, werden [Context](https://reactjs.org/docs/hooks-intro.html) und der [useContext-Hook](https://reactjs.org/docs/hooks-reference.html#usecontext) verwendet.

### Verwendete React-Erweiterungen

-   Zum Frontend-Routing wird [React Router](https://v5.reactrouter.com/web/guides/quick-start) verwendet. Das Routing findet in der App-Komponente statt.

-   Fürs CSS-Styling wird [Styled Components](https://styled-components.com/) und hier insbesondere auch [GlobalStyles](https://scalablecss.com/styled-components-global-styles/) verwendet.

-   Zur Erzeugung von PDFs wird [React PDF](https://react-pdf.org/) verwendet.

-   Für die WYSIWYG-Editoren wird [React Draft Wysiwyg](https://github.com/jpuri/react-draft-wysiwyg) verwendet.

### API-Calls

Mit einer Ausnahme gehen alle Calls aus der App an die eigene Laravel-Api.

#### Laravel-API

Für alle Calls an die Laravel-API wird [Axios](https://axios-http.com/docs/intro) verwendet. Die zugehörigen Services finden sich im Ordner _utils/services_.

In _baseService.js_ ist ein globales Error-Handling implementiert, das bei Server-Fehlern oder unbekannten Fehlern auf eine Fehler-Seite umleitet.

#### OMDB-API

Beim Eintragen von neuen Filmen kann man Informationen von der [OMDB-API](http://www.omdbapi.com/) abrufen. Dieser Call ist mit [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) implementiert, weil die Konfiguration von Axios hier Probleme bereiten würde. Siehe _pages/intern/AddScreeningPage.js_.

### Scrolling

Das Scrolling ist momentan so implementiert, dass bei jedem Seitenwechsel ganz nach oben gescrollt wird, siehe _common/ScrollToTop.js_. Falls es einen eleganten Weg gibt, den Scroll bei jedem Seitenwechsel wiederherzustellen, könnte das Scrolling dementsprechend verbessert werden.

### Konstanten

In der Datei _constants.js_ werden alle Konstanten gesammelt, die in der ganzen App gebraucht werden.

## Sonstiges

### Favicons

Die Favicons (einschließlich diverser Icons für spezielle Betriebssysteme und Geräte) wurden mit [RealFaviconGenerator](https://realfavicongenerator.net/) erstellt und liegen im public-Ordner. Dort liegt auch eine (vom RealFaviconsGenerator erstellte) _README_favicons.md_.

### Kommentare

Manche Kommentare im Code sind auf deutsch, manche auf englisch. Das ist aus Unachtsamkeit entstanden und hat keine Bedeutung.

### Uneinheitlicher Case

Eigentlich wird in der App überall camelCase oder PascalCase verwendet, aber an einigen Stellen taucht auch snake_case auf. Das liegt daran, dass die Benamung von einigen Datenbank-Spalten durcheinander gegangen ist. Der unterschiedliche Case hat keine Bedeutung.

### Testen der API mit Postman

Beim Testen der API-Routes mit [Postman](https://www.postman.com/) gibt es einige Besonderheiten zu beachten - genauer gesagt bei den Routes, die mit Laravel Sanctum geschützt sind. Ein Tutorial zur entsprechenden Einrichtung von Postman findet sich [hier](https://blog.codecourse.com/laravel-sanctum-airlock-with-postman/). Zusätzlicher Hinweis: Das dort beschriebene Pre-request Script muss vor allen POST Requests ausgeführt werden (GET Requests gehen auch ohne).
