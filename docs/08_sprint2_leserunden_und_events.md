# Sprint 2 – Leserunden und Events

## Ziel

Nach Abschluss von Sprint 1 soll die Anwendung um Leserunden und Veranstaltungen erweitert werden.

Bisher werden alle Bücher gemeinsam in einer Liste angezeigt. Zukünftig sollen Bücher einer bestimmten Leserunde zugeordnet werden können. Vergangene Leserunden werden archiviert und in einer Bibliothek angezeigt.

Zusätzlich soll die Grundlage für spätere Buchclub-Events geschaffen werden.

## Geplante Funktionen

### Leserunden

* Leserunden erstellen
* Bücher einer Leserunde zuordnen
* Aktuelle Leserunde anzeigen
* Vergangene Leserunden archivieren
* Bibliothek mit alten Leserunden anzeigen

### Events

* Veranstaltungen für den Buchclub verwalten
* Termine speichern
* Teilnehmer anzeigen
* Vorbereitung für zukünftige Event-Funktionen

## Sprint-Planung

Vor Beginn der Umsetzung wurden die Aufgaben als Sprint-Backlog festgelegt.

### Geplante Arbeitsschritte

* Tabelle `reading_rounds` anlegen
* `reading_round_id` in `books` ergänzen
* Bücher einer Leserunde zuordnen
* Ansicht „Aktuelle Leserunde“
* Ansicht „Bibliothek“

### Sprint-Backlog

![Sprint 2 Planung](images/sprint2_leserunde.png)

## Version 10.0 – Verwaltung von Leserunden

Zu Beginn von Sprint 2 wurde die Grundlage für die Verwaltung mehrerer Leserunden geschaffen.

### Umgesetzte Funktionen

* Neue Tabelle `reading_rounds` in Supabase erstellt
* Verknüpfung zwischen Büchern und Leserunden vorbereitet
* Formular „Neue Leserunde“ im Administrationsbereich integriert
* Jahr wird automatisch mit dem aktuellen Kalenderjahr vorbelegt
* Aktive Leserunde kann über eine Checkbox festgelegt werden
* Erfolgsnachricht nach dem Speichern implementiert
* Es kann immer nur eine aktive Leserunde gleichzeitig geben

### Technische Umsetzung

Für Leserunden wurde eine eigene Datenbanktabelle eingeführt. Jede Leserunde enthält:

* Jahr
* Rundennummer
* Thema
* Lesen-bis-Datum
* Aktiv-Status

Beim Anlegen einer neuen aktiven Leserunde werden vorhandene aktive Leserunden automatisch deaktiviert.

### Screenshot

![Leserundenverwaltung](images/leserundenverwaltung.png)