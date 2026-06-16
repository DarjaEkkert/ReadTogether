# Weiterentwicklung

## Ziel

Die bestehende Anwendung wurde schrittweise erweitert und verbessert, um sie näher an eine reale Buchclub-App heranzuführen.

---

## Version 5 – Design und Struktur

### Design-Anpassung

Das Design der Anwendung wurde überarbeitet, um eine modernere und benutzerfreundliche Oberfläche zu erreichen.  
Dabei wurde sich an einem zuvor erstellten UI-Design orientiert (warme Farben, klare Struktur, Kartenlayout).

### CSS-Refactoring

Das Styling wurde aus der HTML-Datei ausgelagert und in eine separate CSS-Datei (`css/style.css`) verschoben.

Vorteile:
- bessere Struktur  
- leichtere Wartung  
- Trennung von Inhalt und Design  

### HTML-Struktur

Die HTML-Struktur wurde angepasst, damit die neuen CSS-Klassen korrekt angewendet werden können.

Verwendete Klassen:
- `form`  
- `book`  
- `book-title`  
- `book-author`  
- `actions`  

### Fehlerbehebung

Beim Einfügen des Stylesheets traten Probleme durch ungültige Zeichen auf (z. B. vor Farbwerten).  
Diese wurden entfernt, sodass das Design korrekt dargestellt wird.

### Screenshot

![Design](images/app-v5-design.png)

---

## Version 6 – Upload von Buchcovern

Die Anwendung wurde um eine Funktion erweitert, mit der Buchcover direkt vom lokalen Rechner hochgeladen werden können.

Zuvor war nur die Eingabe einer Bild-URL möglich.  
Durch die neue Funktion wird die Nutzung deutlich einfacher und intuitiver.

Technisch wird das ausgewählte Bild im Browser verarbeitet und gespeichert, sodass es direkt angezeigt werden kann.

### Nutzen

- einfachere Bedienung  
- keine externen Bildquellen notwendig  
- bessere Benutzererfahrung  

### Screenshot

![Upload](images/app-v6-image-upload.png)

### Einschränkung

Die Daten werden im `localStorage` gespeichert und sind nur lokal im Browser verfügbar.  
Eine Synchronisation zwischen verschiedenen Nutzern ist nicht möglich.


---


## Aktueller Stand

Die aktuelle Anwendung verfügt über:

- modernes Benutzerinterface
- Buchverwaltung
- Rezensionen
- Sternebewertungen
- Upload von Buchcovern
- lokale Speicherung über localStorage

### Einschränkungen

- keine Benutzerkonten
- keine zentrale Datenbank
- keine Synchronisation zwischen Geräten
- keine gemeinsame Nutzung durch mehrere Nutzer

---
## Architekturentscheidung 2026

### Ausgangssituation

Die aktuelle Version der Bookclub-App speichert alle Daten lokal im Browser über den `localStorage`.

Diese Lösung eignet sich für einen Prototypen, hat aber einige Nachteile:

* Daten sind nur auf einem Gerät verfügbar
* keine gemeinsame Nutzung durch mehrere Benutzer
* keine Benutzerkonten
* keine Synchronisation zwischen verschiedenen Geräten

### Mögliche Lösungen

Für die Weiterentwicklung wurden zwei Varianten betrachtet:

#### Spring Boot + PostgreSQL

Vorteile:

* professionelle Backend-Architektur
* hohe Flexibilität
* guter Lernwert

Nachteile:

* hoher Entwicklungsaufwand
* längere Umsetzungszeit
* zusätzlicher Aufwand für Hosting und Wartung

#### Supabase

Vorteile:

* Benutzerverwaltung bereits vorhanden
* PostgreSQL-Datenbank bereits integriert
* Speicherung von Buchcovern möglich
* schnelle Entwicklung
* geringer Wartungsaufwand

Nachteile:

* weniger selbst entwickelter Backend-Code
* Abhängigkeit von einem externen Dienst

### Entscheidung

Für die nächste Entwicklungsphase wurde Supabase gewählt.

Dadurch kann die Anwendung schneller zu einer echten Mehrbenutzer-App erweitert werden. Geplant sind unter anderem:

* Benutzerkonten
* gemeinsame Buchbibliothek
* Bewertungen und Rezensionen
* Lesestatistiken
* Speicherung von Buchcovern

Eine spätere Migration auf ein eigenes Spring-Boot-Backend bleibt weiterhin möglich.

---

## Version 7 – Cloud-Anbindung mit Supabase

Die Anwendung wurde von einer lokalen Browser-Anwendung zu einer cloudbasierten Webanwendung weiterentwickelt.

Zuvor wurden alle Daten ausschließlich über den `localStorage` des Browsers gespeichert. Dadurch waren die Daten nur auf einem einzelnen Gerät verfügbar.

### Umgesetzte Funktionen

* Anbindung an Supabase
* Zentrale PostgreSQL-Datenbank
* Speicherung von Büchern in der Cloud
* Laden von Büchern aus der Datenbank
* Löschen von Büchern aus der Datenbank
* Bearbeiten von Büchern
* Speicherung von Buchcovern über Supabase Storage

### Technische Umsetzung

Für die Datenhaltung wurde Supabase verwendet. Die Anwendung kommuniziert direkt mit einer PostgreSQL-Datenbank über die bereitgestellte API.

Buchcover werden nicht mehr lokal gespeichert, sondern in einem Storage-Bucket abgelegt. In der Datenbank wird lediglich die URL des Bildes gespeichert.

### Vorteile

* Daten stehen auf mehreren Geräten zur Verfügung
* Zentrale Datenspeicherung
* Grundlage für Mehrbenutzerbetrieb
* Vorbereitung für Benutzerkonten und Authentifizierung

### Screenshot

![Cloud-Version](images/app-v7-cloud.png)

---

## Version 8 – Benutzerkonten und Authentifizierung

Die Anwendung soll mehrere Benutzer unterstützen. Jedes Mitglied des Buchclubs erhält ein eigenes Benutzerkonto und kann sich anmelden

### Umgesetzte Funktionen
*Registrierung neuer Benutzer
*Login mit E-Mail und Passwort
*Logout
*Authentifizierung über Supabase Auth
*Anzeige des aktuell angemeldeten Benutzers
*Benutzerabhängige Buchverwaltung
*Automatisches Laden der Bücher nach Login
*Automatisches Ausblenden der Bücher nach Logout

### Technische Umsetzung

Für die Benutzerverwaltung wurde die Authentifizierung von Supabase verwendet.

Neue Benutzer können sich registrieren und anschließend mit ihrer E-Mail-Adresse und ihrem Passwort anmelden.

Beim Anlegen eines Buches wird die eindeutige Benutzer-ID (user_id) des aktuell angemeldeten Benutzers gespeichert.

Beim Laden der Bücher wird die Datenbankabfrage auf diese Benutzer-ID eingeschränkt. Dadurch werden ausschließlich die Bücher des angemeldeten Benutzers angezeigt.

### Vorteile

* Mehrbenutzerbetrieb möglich
*Trennung der Daten verschiedener Nutzer
*Grundlage für Rollen und Berechtigungen
*Höhere Datensicherheit
*Vorbereitung für zukünftige Community-Funktionen

### Screenshot

![Login-Ansicht](images/ansicht_login.png)
![Benutzer test@test.de](images/ansicht_User1.png)
![Benutzer max@test.de](images/ansicht_User2.png)

### Ergebnis

Die Anwendung wurde von einer Cloud-Anwendung mit gemeinsamer Datenhaltung zu einer echten Mehrbenutzer-Anwendung erweitert. Jeder Benutzer besitzt eine eigene Buchsammlung und kann nur seine eigenen Einträge sehen und verwalten.

### Ergänzung
Im Rahmen der Weiterentwicklung wurde die Benutzeroberfläche für Benutzerprofile vorbereitet. Nach dem Login erscheint eine feste Sidebar auf der linken Seite. Diese enthält einen Avatarbereich, Benutzerinformationen, Lesestatistiken sowie die Logout-Funktion. Der Hauptbereich wurde von der Navigation getrennt und bildet die Grundlage für zukünftige Profilfunktionen.

##Version 9 – Gemeinsame Leserunde

In dieser Version wurde die bisherige persönliche Bücherliste zu einer gemeinsamen Leserunde für alle Mitglieder des Buchclubs weiterentwickelt.

###Die wichtigsten Änderungen:

*Einführung eines Datums „Lesen bis“ beim Anlegen eines Buches.
*Alle Mitglieder sehen nun dieselbe aktuelle Leserunde.
*Die Bücher werden als Karten mit Coverbild dargestellt und nicht mehr als einfache Liste.
*Neue Bücher werden automatisch auch in der Cover-Slideshow angezeigt.
*Einführung einer Rollenanzeige im Profilbereich (Administrator oder Mitglied).
*Verbesserung der Profilnavigation durch einen „Zurück zu meinen Büchern“-Button.
*Korrektur verschiedener Darstellungs- und Rollenfehler.

##Aktueller Stand:

*Administrator kann Bücher für die Leserunde anlegen.
*Mitglieder sehen dieselben Bücher wie der Administrator.
*Grundlage für die spätere Funktion „Gelesen markieren“, Bewertungen und Rezensionen wurde geschaffen.

### Screenshot

![Aktuelle Leserunde](images/ansicht_aktuelleLeserunde.png)

##Version 9.1 

*Neue Tabelle book_reviews in Supabase erstellt.
*Mitglieder können Bücher als gelesen markieren.
*Bewertungsformular mit Lesedatum, Sternebewertung und Review implementiert.
*Interaktive Sternebewertung (1–5 Sterne) umgesetzt.
*Bewertungen werden in der Datenbank gespeichert.
*Mehrfachbewertungen desselben Buches durch denselben Benutzer werden verhindert.
*Erfolgsmeldung nach dem Speichern einer Bewertung hinzugefügt.
*Gelesene Bücher werden automatisch ausgegraut dargestellt.
*Der Button „Gelesen“ wird bei bereits bewerteten Büchern ausgeblendet.
*Persönlicher Zähler „Gelesene Bücher 2026“ in der Sidebar implementiert.
*Leserundenansicht für Mitglieder erweitert und verbessert.
*Grundlage für zukünftige Funktionen wie Durchschnittsbewertungen und Review-Anzeige geschaffen.

### Screenshot

![Aktuelle Leserunde](images/ansicht_aktuelleLeserunde_update.png)

## Version 9.2 – Bewertungen und Rezensionen anzeigen

In dieser Version wurde das Bewertungssystem erweitert.

### Neue Funktionen

* Durchschnittliche Sternebewertung pro Buch wird angezeigt.
* Anzahl der Bewertungen wird angezeigt.
* Rezensionen aller Mitglieder können angezeigt werden.
* Benutzernamen werden bei den Rezensionen dargestellt.

### Technische Umsetzung

Die Bewertungen werden aus der Tabelle `book_reviews` geladen und für jedes Buch ausgewertet.

Zusätzlich werden die Benutzernamen aus der Tabelle `profiles` geladen und den jeweiligen Rezensionen zugeordnet.

Während der Entwicklung musste die Row-Level-Security von Supabase angepasst werden, damit die öffentlichen Profilinformationen anderer Mitglieder gelesen werden können.

### Ergebnis

Mitglieder können nun die Bewertungen und Meinungen anderer Leser sehen. Dadurch wird die Leserunde interaktiver und die Anwendung entwickelt sich weiter zu einer echten Buchclub-App.

### Screenshot

![Bewertungen und Rezensionen](images/ansicht_reviews.png)

## Version 9.3 – Leserstatistik

Die Leserundenansicht wurde um zusätzliche Informationen erweitert.

### Neue Funktionen

* Anzeige der Anzahl der Leser pro Buch
* Umschaltbarer Button für Rezensionen („Reviews anzeigen“ / „Reviews ausblenden“)
* Lange Rezensionen werden automatisch gekürzt dargestellt

### Ergebnis

Mitglieder sehen nun auf einen Blick, wie viele Personen ein Buch bereits gelesen haben. Die Buchkarten enthalten mehr Informationen, bleiben aber weiterhin übersichtlich.

### Screenshot

![Leserstatistik](images/ansicht_leserstatistik.png)

## Version 9.4 – Admin-Menü

Die Administrationsfunktionen wurden in die Sidebar integriert.

### Neue Funktionen

* Administrationsbutton in der Sidebar hinzugefügt
* Button nur für Administratoren sichtbar
* Admin-Bereich kann ein- und ausgeblendet werden
* Formular zum Hinzufügen von Büchern wird nur bei Bedarf angezeigt

### Ergebnis

Die Oberfläche wurde übersichtlicher gestaltet. Das Formular zum Verwalten der Leserunde ist nicht mehr dauerhaft sichtbar und kann über den Administrationsbutton geöffnet oder geschlossen werden.

### Screenshot

![Admin-Menü](images/admin_menu.png)
