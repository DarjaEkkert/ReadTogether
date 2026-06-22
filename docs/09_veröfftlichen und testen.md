\## Version 10.3 – Refactoring und Vorbereitung auf Deployment



Im Rahmen dieser Version wird kein neuer Funktionsumfang implementiert. Stattdessen wird die bestehende Anwendung technisch überarbeitet, um Wartbarkeit, Erweiterbarkeit und Stabilität vor der Veröffentlichung zu verbessern.



\### Umgesetzte Aufgaben



\* Administrationsbereich als eigene Ansicht ausgelagert

\* Zentrales View-System zur Navigation zwischen den Anwendungsbereichen eingeführt

\* HTML-Struktur vereinfacht und unnötige Verschachtelungen entfernt

\* Datei `users.js` in mehrere fachlich getrennte Module aufgeteilt

\* Datei `books.js` in kleinere, übersichtliche Module aufgeteilt

\* CSS-Struktur bereinigt und doppelte Formatierungen zusammengeführt

\* Vorbereitung der Anwendung auf Deployment und Benutzertests



\### Technische Umsetzung



Die bisherige Struktur der Anwendung wurde analysiert und nach Verantwortlichkeiten getrennt. Funktionen zur Benutzerverwaltung, Profilbearbeitung, Bibliotheksverwaltung, Leserundenverwaltung und Administration wurden in eigenständige JavaScript-Dateien ausgelagert.



Zusätzlich wurde ein zentrales View-System eingeführt, das die Navigation zwischen den verschiedenen Bereichen der Anwendung steuert. Dadurch konnten zahlreiche direkte Manipulationen der Anzeigeeigenschaften (`style.display`) reduziert werden.



Die HTML-Struktur wurde vereinfacht und die CSS-Dateien hinsichtlich Wiederverwendbarkeit und Übersichtlichkeit überarbeitet.



\### Ergebnis



Die Anwendung bietet weiterhin denselben Funktionsumfang wie zuvor, verfügt nun jedoch über eine deutlich übersichtlichere und wartbarere Codebasis. Neue Funktionen können einfacher implementiert und bestehende Fehler schneller lokalisiert werden.



Mit Abschluss dieser Version ist ReadTogether technisch für Deployment und erste Benutzertests vorbereitet.

## Version 10.4 – Anzeige verbleibender Bücher

Die Anzeige der aktiven Leserunde wurde erweitert, um den aktuellen Lesefortschritt der Teilnehmer besser sichtbar zu machen.

### Umgesetzte Funktionen

* Anzeige der noch zu lesenden Bücher in der aktiven Leserunde
* Automatische Berechnung anhand der vom Benutzer gespeicherten Bewertungen
* Dynamische Anpassung der Anzahl bei neuen Bewertungen
* Integration der Information direkt in die Übersicht der aktiven Leserunde

### Technische Umsetzung

Bei jedem Laden der Bücher werden die Bücher der aktiven Leserunde mit den vom aktuell angemeldeten Benutzer gespeicherten Bewertungen verglichen. Aus dieser Differenz wird die Anzahl der noch nicht gelesenen Bücher berechnet und in der Leserundenübersicht angezeigt.

### Ergebnis

Teilnehmer sehen nun direkt auf der Startseite, wie viele Bücher der aktuellen Leserunde noch gelesen werden müssen. Dadurch wird der persönliche Fortschritt innerhalb der Leserunde transparenter dargestellt.

![Anzeige verbleibender Bücher in der aktiven Leserunde](images/version10_4_verbleibende_buecher.png)

## Version 10.5 – Erstes Deployment

### Umgesetzte Funktionen

* Deployment der Anwendung auf Netlify
* Verbindung von Netlify und GitHub eingerichtet
* Automatische Veröffentlichung bei neuen Commits aktiviert
* Supabase für die öffentliche URL konfiguriert
* Authentifizierung für die Online-Version getestet

### Technische Umsetzung

Die Anwendung wurde erstmals auf Netlify veröffentlicht. Das GitHub-Repository wurde mit Netlify verbunden, sodass neue Änderungen nach einem Push automatisch veröffentlicht werden. Anschließend wurde die öffentliche Netlify-URL in den Supabase Authentication-Einstellungen als Site URL und Redirect URL hinterlegt.

### Ergebnis

ReadTogether ist nun öffentlich über das Internet erreichbar. Registrierung, Login, Profilverwaltung, Leserunden, Buchverwaltung und Bewertungen funktionieren in der veröffentlichten Version erfolgreich.