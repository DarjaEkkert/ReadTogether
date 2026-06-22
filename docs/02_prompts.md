# KI-Prompts

## Ziel

Unterstützung der Entwicklung einer ReadTogether-App durch den Einsatz von KI-Tools zur Generierung von UI, Funktionalität und Architektur.

---

## Verwendete Tools

- Google AI (Stitch)
- Lovable.dev
- GPT

---

## Prompt 1 – UI-Design (Google AI / Stitch)

Erstelle eine moderne Benutzeroberfläche (GUI) für eine ReadTogether-App mit:
- Liste von Büchern  
- Bewertungssystem  
- Möglichkeit, Bücher hinzuzufügen  

Verwende grün-braune Farbtöne.

### Ergebnis

Es wurde ein UI-Design mit Dashboard, Buchübersicht und Design-System erstellt.

![Dashboard](images/ui-dashboard.png)
![Design](images/ui-design.png)
![Diskussion](images/ui-diskussion.png)

---

## Prompt 2 – Grundversion (Lovable)

Create a simple web application for a personal book club (single-user only).

The app is only for personal use, not for multiple users.  
No authentication or user accounts are required.

Features:
- Add a book (title, author)  
- Rate books (1–5 stars)  
- Write a personal review  
- Display a list of books  

Design:
- Clean, modern, minimal  
- Card-based layout  
- Soft colors and readable typography  
- Use the uploaded screenshot as inspiration  

Tech:
- HTML, CSS, JavaScript or React  
- Use localStorage  
- No backend  

---

## Prompt 3 – Vereinfachte Umsetzung (Lovable)

Create a very simple web app.

The app should:
- Allow adding a book (title, author)  
- Show a list of books  

Use plain HTML, CSS and JavaScript.  
Keep it very simple.

### Ergebnis

![Version 1](images/app-v1-basic.png)

---

## Prompt 4 – Erweiterung Funktionen (Lovable)

Add:
- A text field for personal reviews  
- A rating system (1–5 stars)  
- A book cover image via URL  

Display the book cover in the book list.

### Ergebnis

![Version 2](images/app-v2-basic.png)

---

## Prompt 5 – Design-Anpassung (Lovable)

Use the uploaded image as design inspiration.

Apply:
- warm terracotta and beige colors  
- soft green accents  
- clean typography  
- modern card-based layout  

---

## Prompt 6 – CRUD-Funktionen (Lovable)

Add:
- A delete button for each book  
- The user can remove books  
- An edit button to update book data  

### Ergebnis

![Version 4](images/app-v4-edit-delete.png)

---

## Prompt 7 – Multi-User Erweiterung (Lovable)

I already built a simple book club web app.

Features:
- Add books (title, author)  
- Upload book cover from local device  
- Write review and rating  
- Store data in localStorage  

Now I want to extend it to a multi-user application.

Requirements:
- Authentication (login / register)  
- Roles: admin and user  
- Admin can add books  
- Users can mark books as read  
- Users can add ratings and reviews  
- Shared data for all users  

Use Supabase for backend and authentication.  
Keep the current UI design.

### Architekturentscheidungen (durch Lovable)

- Cover storage: Cloud storage  
- Reviews: one review per user per book  
- Admin: first registered user  
- Auth: email + password  

### Ergebnis

![Login](images/app-v7-login.png)
![Dashboard](images/app-v8-dashboard.png)

---

## Prompt 8 – Aggregierte Bewertungen (Lovable)

Improve the book card to show aggregated data.

Requirements:
- Show average rating  
- Show number of ratings  
- Show how many users marked the book as read  
- Display current user's rating  
- Update values after interaction  

### Ergebnis

- durchschnittliche Bewertung  
- Anzahl der Bewertungen  
- Anzahl gelesener Nutzer  

![Bewertungen](images/app-v9-bookrating.png)

---

## Prompt 9 – Echtzeit-Aktualisierung (Lovable)

Fix real-time UI updates for book stats.

Requirements:
- Update UI immediately after rating/review  
- Update read count instantly  
- Re-fetch aggregated data  
- No reload or logout required  

### Ergebnis

Änderungen (Bewertungen, Lesestatus) werden nun sofort angezeigt, ohne erneutes Laden der Seite.


*****
## Version 9.2 – Bewertungen und Rezensionen anzeigen (GPT)

Die Anwendung besitzt bereits eine Tabelle book_reviews, in der Bewertungen und Rezensionen gespeichert werden.

Erweitere die bestehende ReadTogether-App um folgende Funktionen:

Durchschnittsbewertung pro Buch berechnen
Anzahl der Bewertungen anzeigen
Rezensionen aller Mitglieder anzeigen
Benutzernamen statt Benutzer-IDs darstellen
Bestehende Funktionen nicht verändern

Verwende die vorhandenen Tabellen:

books
book_reviews
profiles

Berücksichtige die bestehenden Supabase-Richtlinien und passe diese bei Bedarf an.

Ergebnis
Durchschnittsbewertung wird auf jeder Buchkarte angezeigt.
Anzahl der Bewertungen wird angezeigt.
Rezensionen können direkt auf der Buchkarte angezeigt werden.
Benutzernamen werden aus der Tabelle profiles geladen.
Die RLS-Richtlinien der Tabelle profiles wurden angepasst, damit öffentliche Profilinformationen für alle Mitglieder sichtbar sind.

## Version 9.3 – Leserstatistik

"können wir noch schnell machen das lange bewertungen gekürzt werden"

"button "Reviews anzeigen" zeigt und versteckt Reviews schon. lass es dabei in "Reviews ausblenden" unbennenen"

"jetzt anzahl mitglieder die es gelesen haben anzeigen"

### Ergebnis

* Lange Rezensionen werden automatisch gekürzt dargestellt.
* Der Button wechselt zwischen „Reviews anzeigen“ und „Reviews ausblenden“.
* Die Anzahl der Leser wird direkt auf der Buchkarte angezeigt.

## Version 9.4 – Admin-Menü

"wollen wir admin menü verstecken?"

"button soll direkt unter Gelesene Bücher angezeigt werden"

"wir wollen jetzt auf und zuklappfunktion machen"

"Admin Bereich und Formular sollen gemeinsam angezeigt und versteckt werden"

### Ergebnis

* Administrationsbutton in die Sidebar verschoben
* Nur für Administratoren sichtbar
* Admin-Bereich kann ein- und ausgeklappt werden
* Formular wird nur bei Bedarf angezeigt

## Version 10.0 – Verwaltung von Leserunden

"wir machen jetzt an idee mit leserunden ran"

"admin erstellt leserunde: jahr, nummer runde, thema, lesen bis"

"danach ist nur diese bücher bleiben in aktuelle leserunde, alles weiteres liegt in archiv"

"aktive leserunde checkbox hinzufügen"

"es darf nur eine aktive leserunde gleichzeitig geben"

### Ergebnis

* Tabelle `reading_rounds` erstellt
* Formular zum Anlegen von Leserunden integriert
* Automatische Vorbelegung des aktuellen Jahres
* Aktive Leserunde auswählbar
* Automatische Deaktivierung bisheriger aktiver Leserunden
* Grundlage für Bibliothek und Archiv geschaffen

##Version 10.1 – Bücher mit Leserunden verknüpfen

"ich will das admin möglichkeit hat beim buch hinzufügen leserunde auswählen"

"machen wir variante a"

"ich habe jetzt datenbank vorbereitet . 5 bücher in inaktive leserunde nummer 4 und 5 bücher in aktive leserunde"

"machen wir"

### Ergebnis

* Dropdown zur Auswahl einer Leserunde im Buchformular ergänzt
* Bücher werden über `reading_round_id` einer Leserunde zugeordnet
* Aktive Leserunde wird automatisch aus der Datenbank geladen
* Ansicht „Aktuelle Leserunde“ zeigt nur Bücher der aktiven Leserunde
* Informationen zur aktiven Leserunde werden oberhalb der Buchliste angezeigt
* Grundlage für die spätere Bibliothek geschaffen

##Version 10.2 – Bibliothek und Avatar-Galerie

"ich will das jede runde im ausgeklappten zustand bücher so anzeigt wie aktuelle runde"

"ich habe jetzt inzwischen 20 avatars erstellt. ich will das auswall nicht mehr über drop Down menüpassiert, sonden Mitglieder sehn, was sie auswählen"

###Ergebnis
*Bibliothek für vergangene Leserunden implementiert
*Vergangene Leserunden werden aus der Tabelle reading_rounds geladen
*Leserunden können einzeln aufgeklappt werden
*Bücher werden über reading_round_id dynamisch geladen
*Wiederverwendung der Funktion createBookCard() für aktuelle und archivierte Bücher
*Einheitliche Darstellung aller Bücher in aktueller Leserunde und Bibliothek
*Bewertungen, Leserzahlen und Rezensionen werden auch im Archiv angezeigt
*Grafische Avatar-Galerie mit 20 Avataren integriert
*Auswahl des Avatars per Mausklick
*Markierung des aktuell ausgewählten Avatars
*Speicherung des Avatars in der Tabelle profiles
*Sofortige Aktualisierung des Avatars in Sidebar und Profilansicht

##Version 10.3 – Refactoring

"ich habe dir jetzt alles geschickt. 

so, meine gedanken jetzt.

1. ganze Adminbereich mit buch und Rundenanlegen sollen wir so behandeln wie wir my Profile behandeln. also, separate seite mit eine button von Panel die nur für Admin sichtbar ist zugänglich

2. klassen books und users ist inzwischen riesig und unverschtendlicher geworden. wir haben sehr viele wiederholungen. ich schlage vor, wir zerlegen die auf wietere klassen. evtl admin.js. profil.js, bibliothek.js, lesenrunden.js

3. index.html soll aufgeräumt werden. da ist viel zuz viel verschachtelungen, was fehler ausrufen.

4. und daswegen style.css hat jetzt auch mehrere widerhollungen und unsinvolle formatirungen. 



bevor ReadTogether veröffentlicht wird brauchen wir große Refactoring "

### Umgesetzte Funktionen

* Einführung eines zentralen View-Systems mit `showView()`
* Auslagerung der Profilfunktionen nach `profile.js`
* Auslagerung der Administrationsfunktionen nach `admin.js`
* Auslagerung der Bibliotheksfunktionen nach `library.js`
* Auslagerung der Leserundenverwaltung nach `readingRounds.js`
* Auslagerung der administrativen Buchfunktionen nach `booksAdmin.js`
* Einführung einer separaten Administrationsansicht
* Vereinfachung der Navigation zwischen Home, Profil und Administration
* Entfernung mehrfacher und redundanter `style.display`-Steuerungen

### Technische Umsetzung

Das Refactoring wurde schrittweise durchgeführt. Nach jeder Änderung wurde die Anwendung getestet, bevor weitere Funktionen ausgelagert wurden. Die großen Dateien `users.js` und `books.js` wurden analysiert und fachlich zusammengehörige Funktionen in eigene Module verschoben.

Zusätzlich wurde ein einheitliches View-System eingeführt, sodass die Navigation nicht mehr über zahlreiche einzelne Anzeigen- und Ausblendlogiken erfolgt.

### Ergebnis

Die Codebasis ist deutlich übersichtlicher geworden. Funktionen sind nun fachlich getrennt organisiert und leichter wartbar. Die Navigation zwischen den Bereichen der Anwendung wurde vereinfacht und die Anwendung für die ersten Testnutzer vorbereitet.

## Version 10.4 – Anzeige verbleibender Bücher

### Verwendete Prompts

"Die Anzeige der aktiven Leserunde soll erweitert werden. Statt der Gesamtanzahl der Bücher soll angezeigt werden, wie viele Bücher der aktuell angemeldete Benutzer noch lesen muss."

"Prüfe die bestehende Logik zur Berechnung der gelesenen Bücher und ermittle, wie die verbleibenden Bücher der aktiven Leserunde korrekt berechnet werden können."

"Die Berechnung soll nur Bücher der aktuellen Leserunde berücksichtigen und die vom aktuell angemeldeten Benutzer gespeicherten Bewertungen auswerten."

"Die neue Anzeige soll direkt in der Übersicht der aktiven Leserunde erscheinen und automatisch aktualisiert werden, sobald eine neue Bewertung gespeichert wird."

### Ergebnis

Die Startseite zeigt nun für jeden Benutzer den individuellen Fortschritt innerhalb der aktiven Leserunde an. Die Anzahl der verbleibenden Bücher wird automatisch anhand der bereits gespeicherten Bewertungen des angemeldeten Benutzers berechnet.

Im dargestellten Beispiel hat das Mitglied „TestK“ bereits drei Bücher der aktuellen Leserunde bewertet. Die Anwendung erkennt automatisch, dass noch zwei Bücher offen sind, und zeigt dies als Hinweis „2 Bücher bis zum 2026-06-27 lesen“ in der Leserundenübersicht an.

Dadurch erhalten die Teilnehmer einen schnellen Überblick über ihren aktuellen Fortschritt und die noch verbleibenden Bücher der laufenden Leserunde.

