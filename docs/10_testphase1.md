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



\###Verbesserungsvorschläge



\*Lesestatus erweitern



Mehrere Nutzer wünschen zusätzliche Lesestatus.



Aktuell:



\*Gelesen



Vorgeschlagene Erweiterungen:



\*Lese aktuell

\*Abgebrochen



Nutzen:



\*Realistischere Abbildung des Leseverhaltens

\*Bessere Übersicht innerhalb des Buchclubs

\*Mehr Interaktion zwischen den Mitgliedern



Status:



Für Version 11.0 prüfen



\*Bibliotheksansicht wird zurückgesetzt



Beim Markieren eines Buches als gelesen werden geöffnete Bibliotheksrunden automatisch geschlossen.



Ursache:



\*Nach dem Speichern einer Bewertung wird die komplette Buch- und Bibliotheksansicht neu geladen.



Auswirkung:



\*Benutzer verlieren ihre aktuelle Position in der Bibliothek.

\*Geöffnete Leserunden müssen erneut geöffnet werden.



Status:



Offen



Priorität:



Mittel



\##Version 10.5.2 – Testphase 1



"Erstes Feedback zur Benutzerregistrierung wurde ausgewertet und die Eingabevalidierung verbessert."



\###Behobene Probleme



\*Registrierung ohne Passwort



Externe Tester meldeten, dass bei einer Registrierung ohne Passwort keine verständliche Fehlermeldung angezeigt wurde.



Lösung:



\*Prüfung auf leere E-Mail-Adresse ergänzt

\*Prüfung auf leeres Passwort ergänzt

\*Benutzerfreundliche Meldungen im Interface statt technischer Supabase-Fehler



Ergebnis:



\*Benutzer erhalten nun sofort verständliche Hinweise bei fehlenden Eingaben.



\---



\*Zu kurzes Passwort



Externe Tester meldeten Unklarheiten bei der Passwortvergabe.



Lösung:



\*Prüfung der Passwortlänge vor der Registrierung ergänzt.



Ergebnis:



\*Passwörter mit weniger als 6 Zeichen werden abgefangen.

\*Benutzer erhalten die Meldung:



"Das Passwort muss mindestens 6 Zeichen enthalten."



\###Ergebnis



\*Registrierungsprozess benutzerfreundlicher gestaltet

\*Technische Fehlermeldungen reduziert

\*Erstes Testerfeedback erfolgreich umgesetzt

\*Grundlegende Eingabevalidierung für neue Benutzer eingeführt

