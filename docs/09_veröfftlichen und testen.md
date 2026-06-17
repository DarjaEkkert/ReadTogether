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

