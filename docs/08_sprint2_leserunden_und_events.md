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

## Version 10.1 – Bücher mit Leserunden verknüpfen

Die Verwaltung der Leserunden wurde erweitert. Beim Anlegen eines Buches kann der Administrator nun auswählen, zu welcher Leserunde das Buch gehört.

### Umgesetzte Funktionen

* Dropdown-Liste mit allen vorhandenen Leserunden
* Bücher werden einer konkreten Leserunde zugeordnet
* Aktive Leserunde wird aus der Datenbank geladen
* In der Ansicht „Aktuelle Leserunde“ werden nur Bücher der aktiven Leserunde angezeigt
* Informationen zur aktiven Leserunde werden oberhalb der Buchliste dargestellt

### Technische Umsetzung

Die Tabelle `books` wurde über die Spalte `reading_round_id` mit der Tabelle `reading_rounds` verknüpft.

Beim Laden der Bücher wird zunächst die aktive Leserunde ermittelt. Anschließend werden ausschließlich Bücher geladen, die dieser Leserunde zugeordnet sind.

### Ergebnis

Die Anwendung unterscheidet nun zwischen aktueller Leserunde und archivierten Leserunden. Dadurch wurde die Grundlage für die spätere Bibliothek geschaffen.

## Version 10.2 – Bibliothek und Avatar-Galerie

Im weiteren Verlauf von Sprint 2 wurde die Trennung zwischen aktueller und vergangener Leserunde vollständig umgesetzt. Zusätzlich wurde die Benutzerverwaltung durch eine grafische Avatar-Auswahl erweitert.

### Umgesetzte Funktionen

* Bibliothek für vergangene Leserunden eingeführt
* Vergangene Leserunden werden automatisch archiviert dargestellt
* Leserunden können einzeln aufgeklappt werden
* Bücher einer archivierten Leserunde werden dynamisch aus der Datenbank geladen
* Einheitliche Darstellung von Büchern in aktueller Leserunde und Bibliothek
* Grafische Avatar-Galerie mit 20 auswählbaren Avataren integriert
* Ausgewählter Avatar wird im Benutzerprofil und in der Sidebar angezeigt
* Avatar-Auswahl wird dauerhaft gespeichert

### Technische Umsetzung

Für die Bibliothek werden alle Leserunden geladen, deren Attribut `is_active` auf `false` gesetzt ist. Beim Öffnen einer Leserunde werden die zugehörigen Bücher über die Verknüpfung `reading_round_id` aus der Tabelle `books` geladen.

Die bereits vorhandene Funktion `createBookCard()` wurde wiederverwendet, sodass aktuelle und archivierte Bücher dieselbe Darstellung besitzen. Dadurch konnten redundante Codeabschnitte vermieden werden.

Die Avatar-Auswahl wurde von einer Dropdown-Liste auf eine visuelle Galerie umgestellt. Die Avatare werden dynamisch aus dem Ordner `avatars` geladen. Die Auswahl wird in der Tabelle `profiles` gespeichert und nach dem Speichern sofort in der Sidebar angezeigt.

### Ergebnis

Die Anwendung besitzt nun eine vollständige Trennung zwischen aktueller Leserunde und Archiv. Mitglieder können vergangene Leserunden einschließlich Bewertungen und Rezensionen einsehen.

Zusätzlich wurde die Benutzerfreundlichkeit der Profilverwaltung durch die neue Avatar-Galerie deutlich verbessert.

### Screenshot

![Startseite mit aktueller Leserunde und Bibliothek](images/startseite_bibliothek.png)

![Benutzerprofil mit Avatar-Galerie](images/avatar_galerie.png)

