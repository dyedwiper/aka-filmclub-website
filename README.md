# Website des aka-Filmclub

## Einleitung

Dies ist der Code für die Website vom aka-Filmclub Freiburg e.V., erreichbar unter https://www.aka-filmclub.de/.

Diese Readme enthält Erklärungen zum Technologie-Stack und zur Progammierung. Dabei wird besonders auf die Dinge eingegangen, die vom Standard abweichen.

Außerdem wird erklärt, was nötig ist, um die App lokal installieren.

### Grundlegendes Setup

Das Backend der Website ist mit [Laravel](https://laravel.com/) gebaut, das Frontend mit [React](https://reactjs.org/).

Es handelt sich um eine [Single-Page-Applicaton (SPA)](https://de.wikipedia.org/wiki/Single-Page-Webanwendung), d.h. beim Aufruf der Website wird das gesamte Frontend als JavaScript-Anwendung an den Browser geschickt. Beim Navigieren oder anderen Interaktionen fragt das Frontend nur noch Daten vom Backend ab bzw. schickt Daten ans Backend.

## Installation und Entwicklung

### Voraussetzungen

Damit die App lokal läuft, muss folgendes installiert sein:

-   [PHP](https://www.php.net/) (7.4, 8)
-   eine SQL-Datenbank z.B. [MariaDB](https://mariadb.org/) (10.1)
-   ein Webserver, z.B. [Apache](https://httpd.apache.org/) (2.4)

Zur Entwicklung ist außerdem notwendig:

-   [Node.js](https://nodejs.org/en/) (14.5)

In Klammern stehen die Versionen, mit denen die App getestet wurde. Es kann sein, dass sie auch mit älteren oder neueren Versionen läuft.

### Installation

Da die Vendor-Biblitheken mit im Repository liegen (Erklärung dazu [hier](#vendor-ordner)), muss Laravel nicht extra installiert werden. Die App ist praktisch sofort lauffähig. Es müssen nur die folgenden Dinge erledigt werden:

#### env

Die Werte im env-File müssen angepasst werden. Ein Beispiel-env-File liegt als _env.example_ im Repository. Erklärungen finden sich [hier](https://laravel.com/docs/8.x#environment-based-configuration) und [hier](https://laravel.com/docs/8.x/configuration) in der Laravel-Doku.

#### Datenbank

Die Datenbank-Tabellen für die Website müssen erzeugt werden. Das geht mit dem Befehl `php artisan migrate`.

Danach müssen einige Datensätze geseedet werden mit dem Befehl `php artisan db:seed`. Dadurch werden auch die User "armin", "edith", und "otto" erzeugt - jeweils mit gleichlautendem Passwort.

Falls auch die [Verbindung zum Forum](#verbindung-zum-forum) bestehen soll, muss dafür eine zusätzliche Datenbank eingerichtet werden. Die Tabellen für die Forums-Datenbank sind [hier](https://wiki.phpbb.com/Tables) gelistet. Die einfachste Möglichkeit, die Datenbank einzurichten, ist wohl, ein phpBB-Forum lokal zu installieren.

#### Webserver

Der Webserver muss auf den _/public_-Ordner zeigen.

#### Verlinkung Storage-Ordner

Für die Interaktion mit dem Dateisystem muss ein Link erstellt werden, siehe dazu [hier](https://laravel.com/docs/8.x/filesystem#the-public-disk).

### Entwicklung

#### Versionsverwaltung mit Git

Zur Versionsverwaltung wird [Git](https://git-scm.com/) verwendet. Im Folgenden sind ein paar Besonderheiten beschrieben.

##### _vendor_-Ordner

Normalerweise würde man einen Ordner mit Fremd-Bibliotheken wie den _vendor_-Ordner nicht in die Versionsverwaltung einchecken. Das ist hier aber nötig, weil die App direkt über Git auf den Webserver des Website-Hosts geladen wird und es dort keine Möglichkeit gibt, die Bibliotheken wiederherzustellen (weil z.B. Composer nicht auf dem Webserver installiert ist).

##### Kompiliertes Frontend

Die Datei _public/js/app.js_, die das kompilierte Frontend enthält, würde man eigentlich auch nicht mit einchecken. Dass es dennoch so ist, hat einen ähnlichen Grund wie beim _vendor_-Ordner: Es gibt keine Möglichkeit die Datei auf dem Webserver zu kompilieren.

##### Branches

Es gibt die zwei Branches _main_ und _prod_. Sie unterscheiden sich nur dadurch, wie die _app.js_-Datei kompiliert wurde, ob im _dev_- oder im _prod_-Modus (siehe dazu [hier](#laravel-mix-und-npm)). Für die Entwicklung ist der _main_-Branch gedacht.

#### Laravel Mix und NPM

Das Frontend wird mithilfe von [Laravel Mix](https://laravel.com/docs/8.x/mix) kompiliert. Die Konfiguration von Mix liegt in der Datei _webpack.mix.js_.

Vor dem erstmaligen Verwenden der App muss einmal der Befehl `npm install` ausgeführt werden.

Die anderen für diese App relevanten NPM-Befehle (die sich auch in der _package.json_ finden) sind:

-   `npm run dev`: Kompiliert das Frontend.
-   `npm run watch`: Überwacht Änderungen im Code und kompiliert das Frontend automatisch bei jeder Änderung.
-   `npm run prod`: Kompiliert das Frontend und minifiziert das Output-File.

## Backend

### Routes

Die Web-Routes sind in der Datei _routes/web.php_ definiert. Es gibt nur zwei:

-   Die obere ist ein Spezialfall: Unter _/files_ lassen sich Dateien zum Download hinterlegen, siehe dazu [hier](https://laravel.com/docs/8.x/responses#file-responses).
-   Auf allen anderen Routes, die nicht mit _api_ beginnen, wird der _index_-View zurückgegeben, über den dann die React-App geladen wird.

Die Api-Routes sind in der Datei _routes/api.php_ definiert und nach Ressourcen gruppiert.

Zum Routing siehe: https://laravel.com/docs/8.x/routing.

### Authentifizierung

Zur Authentifizierung wird [Laravel Sanctum](https://laravel.com/docs/8.x/sanctum#introduction) verwendet. Siehe insbesondere den Abschnitt zu [SPA Authentication](https://laravel.com/docs/8.x/sanctum#spa-authentication) in der Doku.

Die Authentifizierung ist manuell implementiert, ausgehend von [dieser Beschreibung](https://laravel.com/docs/8.x/authentication#authenticating-users). Sie findet sich in _app/Http/Controllers/UserController.php_. Sie ist so eingerichtet, dass der Login nach x fehlgeschlagenen Anmeldeversuchen für y Minuten für den jeweiligen User blockiert wird. x und y können im env-File eingestellt werden.

Für die Speicherung der Session wurde die Datenbank gewählt, siehe dazu: https://laravel.com/docs/8.x/session#introduction

### Authorisierung und Validierung

Authorisierung und Validierung sind mit [Form Requests](https://laravel.com/docs/8.x/validation#form-request-validation) implementiert.

### Upload von Bildern

Auf der Website können Bilder hochgeladen werden, die wie [hier](https://laravel.com/docs/8.x/filesystem#file-uploads) beschrieben gespeichert werden.

### Middleware für Sharing

Fürs Sharen auf Facebook, Telegram, WhatsApp und Twitter gibt es eine eigene [Middleware](https://laravel.com/docs/8.x/middleware), die unter _app/Http/Middleware/SendJustMetaWhenSharing.php_ zu finden ist.

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

Die Dateien _app.js_ und _bootstrap.js_ im Ordner _resources/js_ sind Dateien aus dem Standard-Setup von Laravel. In _app.js_ wird der JavaScript-Code gesammelt, der von [Laravel Mix](https://laravel.com/docs/8.x/mix) kompiliert wird. In _bootstrap.js_ steht globale Konfiguration - momentan nur für [Axios](https://axios-http.com/docs/intro).

### Gerüst der React-App

Das Gerüst der React-App lehnt sich an das Gerüst an, das standardmäßig von [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) für eine neue App erzeugt wird. Der Eintrittspunkt ist in _index.js_, wo die App-Komponente ins DOM gerendert wird. Die App-Komponente befindet sich der Datei _App.js_ und enthält alle weiteren Komponenten.

### Ordner-Struktur

-   _pages_ enthält die React-Komponenten, die Seiten entsprechen.

-   _common_ enthält alle React-Komponenten, die nicht Seiten entsprechen.

-   _utils_ enthält zusätzliche JavaScript-Funktionalität.

-   _styles_ enthält Dateien, die CSS-Styles betreffen.

-   _assets_ enthält statische Dateien, die in der App verwendet werden.

### Verwendete React-Funktionalität

Die React-App ist mit [React Function Components](https://www.robinwieruch.de/react-function-component/) und [Hooks](https://reactjs.org/docs/hooks-intro.html) geschrieben. (Achtung vor Verwirrung: Viele Beispiele in der React-Dokumentation beziehen sich noch auf React Class Components.)

Um Werte in der ganzen App verfügbar zu machen, werden [Context](https://reactjs.org/docs/hooks-intro.html) und der [useContext-Hook](https://reactjs.org/docs/hooks-reference.html#usecontext) verwendet.

### Verwendete React-Erweiterungen

-   Zum Frontend-Routing verwendet die App [React Router](https://v5.reactrouter.com/web/guides/quick-start). Das Routing findet in der App-Komponente statt.

-   Fürs CSS-Styling verwendet die App [Styled Components](https://styled-components.com/) und hier insbesondere auch [GlobalStyles](https://scalablecss.com/styled-components-global-styles/).

-   Zur Erzeugung von PDFs verwendet die App [React PDF](https://react-pdf.org/). Dabei wird zum Styling die [Styled-Components-Erweiterung für React PDF](https://www.npmjs.com/package/@react-pdf/styled-components) verwendet, die eigentlich veraltet ist und bei Gelegenheit ausgebaut werden sollte.

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

Manche Kommentare im Code sind auf deutsch, manche auf englisch. Das ist aus Unachtsamkeit entstanden und hat keine Bedeutung, wäre aber zu viel Aufwand zu vereinheitlichen.

### Uneinheitlicher Case

Eigentlich wird in der App überall camelCase oder PascalCase verwendet, aber an einigen Stellen taucht auch snake_case auf. Das liegt daran, dass die Benamung von einigen Datenbank-Spalten durcheinander gegangen ist. Der unterschiedliche Case hat keine Bedeutung; es wäre aber zu viel Aufwand ihn zu vereinheitlichen.
