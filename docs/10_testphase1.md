\##Version 10.5 – Testphase 1



Die Anwendung wurde erstmals veröffentlicht und erste externe Tester eingeladen.



\###Gefundene Probleme



\*Registrierung mit leeren Feldern



Beim Klick auf „Registrieren" ohne Eingabe von E-Mail oder Passwort erscheint die Fehlermeldung:



"Anonymous sign-ins are disabled"



Die Meldung ist für normale Nutzer nicht verständlich.



Geplante Lösung:



\*Prüfung auf leere Felder vor signUp()

\*Benutzerfreundliche Fehlermeldung anzeigen



Status:

Offen



\###Verbesserungsvorschläge



\*Erweiterte Registrierung



Idee:



\*Benutzername direkt bei Registrierung erfassen

\*Lieblingsbuch direkt bei Registrierung erfassen

\*Avatar optional bereits bei Registrierung auswählen



\##Version 10.5.1 – Testphase 1



"Erste Rückmeldungen externer Tester wurden ausgewertet und kleinere Fehler behoben."



\###Behobene Probleme



\*Bewertungen in der Bibliothek



Externe Tester meldeten, dass Bücher aus vergangenen Leserunden zwar als gelesen markiert werden konnten, die Sternebewertung jedoch nicht auswählbar war.



Ursache:



\*Die Bewertungssterne wurden nach dem Laden der Bibliotheksbücher nicht initialisiert.



Lösung:



\*Aufruf von initRatings() nach dem Rendern der Bücher in toggleLibraryRound() ergänzt.



Ergebnis:



\*Bewertungen funktionieren nun auch bei Büchern aus vergangenen Leserunden.



\---



\*Sortierung der Bibliothek



Die abgeschlossenen Leserunden wurden in der Reihenfolge ihrer Erstellung angezeigt.



Lösung:



\*Sortierung nach round\_number absteigend ergänzt.



Ergebnis:



\*Die neuesten abgeschlossenen Leserunden werden nun zuerst angezeigt.

\*Die Bibliothek ist übersichtlicher und entspricht der erwarteten Reihenfolge für Benutzer.



\###Ergebnis



\*Erste externe Testphase erfolgreich gestartet

\*Mehrere UX-Probleme identifiziert und behoben

\*Bewertungen funktionieren nun in aktiven und archivierten Leserunden

\*Bibliothek zeigt abgeschlossene Leserunden in sinnvoller Reihenfolge an

