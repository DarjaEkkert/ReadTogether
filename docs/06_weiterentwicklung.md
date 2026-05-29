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

## Geplante Version 8 – Gemeinsame Bibliothek

Aktuell werden alle Bücher lokal im Browser gespeichert.

Zukünftig sollen Bücher zentral in einer Datenbank gespeichert werden, damit alle Mitglieder des Buchclubs dieselben Daten sehen können.

Geplante Funktionen:

- gemeinsame Buchliste
- zentrale Speicherung aller Rezensionen
- gemeinsame Bewertungen
- Synchronisation zwischen verschiedenen Geräten
