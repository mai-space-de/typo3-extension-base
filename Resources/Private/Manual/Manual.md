---
version: "1.0"
date: 2026-11-06
---

# Handbuch: Basis

Die Basis liefert das gemeinsame TypoScript, die Seitenlayouts und das Modul **Records** für die Datensatz-Tabellen der anderen Extensions.

## Datensätze finden

Viele Inhalte wie News, FAQ oder Team liegen nicht als normale Seiten, sondern als Datensätze. Du findest sie unter **Records**, direkt neben **Web**.

Ohne passende Ablage-Seite oder ohne Recht auf die Tabelle bleibt das Modul leer.

## Passwortschutz (HTTP Basic Auth)

Eine Website, eine einzelne Sprache oder einzelne Seiten lassen sich hinter das Login-Fenster des Browsers legen. Alle drei Varianten nutzen dieselbe Sperre.

- **Ganze Website** (alle Sprachen und Varianten): In den Site-Einstellungen unter **Base → HTTP password protection** den Schutz einschalten und Logins als `benutzername:passwort` eintragen, z. B. einen für die Agentur und einen für den Kunden.
- **Eine Sprache**: Im Modul **Sites** die Sprache bearbeiten und **Diese Sprache mit Passwort schützen** aktivieren. Optional eigene Logins ergänzen.
- **Eine Seite**: In den Seiteneigenschaften im Reiter **Zugriff** den **HTTP-Passwortschutz** auf „Nur diese Seite“ oder „Diese Seite und alle Unterseiten“ stellen und Benutzername und Passwort vergeben. Für eine versteckte Seite zusätzlich „Im Menü verbergen“ setzen.

Die Logins aus den Site-Einstellungen öffnen immer auch geschützte Sprachen und Seiten. Im Backend angemeldete Redakteure kommen ohne Passwort durch, solange das nicht abgeschaltet ist.

## Was hier nicht gepflegt wird

Seiteninhalt, Menüs und einzelne Plugins gehören in die jeweilige Extension oder ins Theme. Die Basis stellt nur die gemeinsame Grundlage bereit.
