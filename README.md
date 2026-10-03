# www.airxygene.fr

Site statique FR (racine) / EN (`/en/`) / ES (`/es/`).

## Une app = un dossier

```
apps/<slug>/
  app.json     nom, visible, platforms, store (URL ou null), description {fr,en,es}
  icon.png     optionnel (ou "icon": URL dans app.json)
  shots/       optionnel : captures locales (ou "shots": [URL…] dans app.json)
```

- Ordre d'affichage : `apps/order.json` (liste de slugs, dans l'ordre voulu ; les apps non listées passent en dernier).
- Ajouter une app : créer un dossier avec son `app.json` (copier un existant) et l'ajouter à `order.json`.
- Retirer une app : supprimer le dossier, ou mettre `"visible": false`.
- Puis `python3 build.py` régénère les pages.

Textes communs (tagline, boutons, confidentialité) et adresse de feedback : `build.py`. Style : `assets/style.css`.

## Local

    python3 -m http.server 8000   # http://localhost:8000
