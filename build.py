#!/usr/bin/env python3
"""Génère le site statique (fr à la racine, /en/, /es/). Usage : python3 build.py"""
from pathlib import Path
import json
from html import escape

ROOT = Path(__file__).parent
CONTACT = "contact@airxygene.fr"  # jamais écrite en clair dans le HTML (voir assets/mail.js)
USER, DOMAIN = CONTACT.split("@")
LANGS = ["fr", "en", "es"]
PREFIX = {"fr": "", "en": "en/", "es": "es/"}

def load_apps():
    """Une app = un dossier apps/<slug>/ avec app.json (+ icon.* et shots/ optionnels).
    Ajouter une app = ajouter un dossier ; la retirer = supprimer le dossier (ou "visible": false)."""
    apps = []
    for f in (ROOT / "apps").glob("*/app.json"):
        a = json.loads(f.read_text(encoding="utf-8"))
        if not a.get("visible", True):
            continue
        a["slug"] = f.parent.name
        rel = lambda x: x if x.startswith("http") else f"apps/{a['slug']}/{x}"
        icon = a.get("icon") or next((x.name for x in f.parent.glob("icon.*")), None)
        a["icon"] = rel(icon) if icon else None
        shots = a.get("shots") or [f"shots/{x.name}" for x in sorted((f.parent / "shots").glob("*.*"))]
        a["shots"] = [rel(x) for x in shots]
        apps.append(a)
    return sorted(apps, key=lambda a: a.get("order", 99))


def url(path, depth):
    return path if path.startswith("http") else depth + path



T = {
    "fr": {
        "title": "AirXygène – Applications iPhone & Mac",
        "tagline": "Des applications simples, faites avec soin par Stef Millet.",
        "store": "Voir sur l’App Store", "soon": "Bientôt disponible",
        "feedback": "Support &amp; avis", "privacy": "Politique de confidentialité",
        "subject": "Support / avis : {app}",
        "p_title": "Politique de confidentialité",
        "p_body": ["Nous ne téléchargeons aucune de vos données vers nos serveurs.",
                   "Vos données restent là où vous les enregistrez et vous appartiennent exclusivement."],
        "p_contact": "Une question sur la confidentialité ?", "contact": "Nous contacter",
        "footer": "© AirXygène",
    },
    "en": {
        "title": "AirXygène – iPhone & Mac apps",
        "tagline": "Simple apps, carefully made by Stef Millet.",
        "store": "View on the App Store", "soon": "Coming soon",
        "feedback": "Support &amp; feedback", "privacy": "Privacy policy",
        "subject": "Support / feedback: {app}",
        "p_title": "Privacy policy",
        "p_body": ["We do not upload any of your data to our servers.",
                   "Your data stays where you save it and belongs exclusively to you."],
        "p_contact": "A question about privacy?", "contact": "Contact us",
        "footer": "© AirXygène",
    },
    "es": {
        "title": "AirXygène – Apps para iPhone y Mac",
        "tagline": "Apps sencillas, hechas con cuidado por Stef Millet.",
        "store": "Ver en el App Store", "soon": "Próximamente",
        "feedback": "Soporte y comentarios", "privacy": "Política de privacidad",
        "subject": "Soporte / comentarios: {app}",
        "p_title": "Política de privacidad",
        "p_body": ["No subimos ninguno de tus datos a nuestros servidores.",
                   "Tus datos se quedan donde los guardas y te pertenecen exclusivamente."],
        "p_contact": "¿Alguna pregunta sobre la privacidad?", "contact": "Contáctanos",
        "footer": "© AirXygène",
    },
}
NAMES = {"fr": "Français", "en": "English", "es": "Español"}


def page(lang, kind):
    t = T[lang]
    depth = "" if lang == "fr" else "../"  # chemin relatif vers la racine
    here = "index.html" if kind == "home" else "privacy.html"
    langnav = " · ".join(
        '<a href="%s%s%s" hreflang="%s"%s>%s</a>' % (
            depth, PREFIX[l], here, l, ' aria-current="true"' if l == lang else "", NAMES[l])
        for l in LANGS)
    head = f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{escape(t['title'] if kind == 'home' else t['p_title'] + ' – AirXygène')}</title>
<meta name="description" content="{escape(t['tagline'])}">
<link rel="icon" href="{depth}assets/logo.png">
<link rel="stylesheet" href="{depth}assets/style.css">
</head>
<body>
<header>
<a class="brand" href="{depth}{PREFIX[lang]}index.html"><img src="{depth}assets/logo.png" alt="" width="64" height="64"><span>AirXygène</span></a>
<nav class="langs">{langnav}</nav>
</header>
<main>
"""
    foot = f"""</main>
<footer>
<a href="{depth}{PREFIX[lang]}privacy.html">{t['privacy']}</a>
<span>{t['footer']}</span>
</footer>
<script src="{depth}assets/mail.js"></script>
</body>
</html>
"""
    if kind == "privacy":
        body = f"""<article class="policy">
<h1>{t['p_title']}</h1>
{''.join(f'<p>{escape(p)}</p>' for p in t['p_body'])}
<p>{t['p_contact']}</p>
<p><a class="btn primary" href="#" data-u="{USER}" data-d="{DOMAIN}">{t['contact']}</a></p>
</article>
"""
        return head + body + foot

    parts = [f'<section class="hero"><h1>AirXygène</h1><p>{escape(t["tagline"])}</p></section>']
    apps = load_apps()
    cards = "".join(
        f'<a class="card" href="#{a["slug"]}">'
        + (f'<img src="{url(a["icon"], depth)}" alt="" width="96" height="96">' if a["icon"] else '<span class="icon"></span>')
        + f'<span>{escape(a["name"])}</span></a>' for a in apps)
    parts.append(f'<nav class="carousel" aria-label="Apps">{cards}</nav>')
    for a in apps:
        subj = escape(t["subject"].format(app=a["name"]), quote=True)
        store = (f'<a class="btn primary" href="{a["store"]}" rel="noopener">{t["store"]}</a>'
                 if a.get("store") else f'<span class="btn disabled">{t["soon"]}</span>')
        shots = "".join(
            f'<img src="{url(s, depth)}" alt="{escape(a["name"])}" loading="lazy" onerror="this.remove()">'
            for s in a["shots"])
        icon = (f'<img class="icon" src="{url(a["icon"], depth)}" alt="" width="96" height="96">'
                if a["icon"] else '<span class="icon"></span>')
        platforms = " · ".join(a.get("platforms", []))
        parts.append(f"""<section class="app" id="{a['slug']}">
<div class="app-head">
{icon}
<div>
<h2>{escape(a['name'])}</h2>
<p class="platforms">{platforms}</p>
<p>{escape(a['description'][lang])}</p>
<p class="links">{store}<a class="btn" href="#" data-u="{USER}" data-d="{DOMAIN}" data-s="{subj}">{t['feedback']}</a></p>
</div>
</div>
{f'<div class="shots">{shots}</div>' if shots else ''}
</section>""")
    return head + "\n".join(parts) + "\n" + foot


def main():
    for lang in LANGS:
        d = ROOT / PREFIX[lang]
        d.mkdir(exist_ok=True)
        (d / "index.html").write_text(page(lang, "home"), encoding="utf-8")
        (d / "privacy.html").write_text(page(lang, "privacy"), encoding="utf-8")
    print("OK")


if __name__ == "__main__":
    main()
