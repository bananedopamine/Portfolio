# Portfolio — BTS SIO

Portfolio personnel développé en PHP avec le moteur de templates **Twig**.

---

## Arborescence

```
portfolio/
├── public/                  → Racine web (DocumentRoot Apache/Nginx)
│   ├── index.php            → Point d'entrée unique (router)
│   ├── .htaccess            → Réécriture d'URL (Apache)
│   └── assets/
│       ├── css/style.css    → Styles complets (design system)
│       ├── js/main.js       → Interactions JS
│       └── images/          → Photos, captures de projets
│
├── templates/               → Templates Twig
│   ├── layout/
│   │   └── base.twig        → Layout principal (HTML de base)
│   ├── partials/
│   │   ├── nav.twig         → Navigation latérale
│   │   ├── footer.twig      → Pied de page
│   │   ├── card.twig        → Composant carte réutilisable
│   │   └── section-header.twig → En-tête de section
│   └── pages/
│       ├── accueil.twig     → Page d'accueil
│       ├── profil.twig      → Profil & compétences
│       ├── parcours.twig    → Formation & écoles
│       ├── experience.twig  → Stages & expériences
│       ├── missions.twig    → Projets BTS
│       ├── veille.twig      → Veille technologique
│       ├── contact.twig     → Page de contact
│       └── 404.twig         → Page d'erreur
│
├── data/                    → Données JSON (à compléter)
│   ├── profil.json          → Identité + compétences + langues
│   ├── accueil.json         → Stats page d'accueil
│   ├── parcours.json        → Formations
│   ├── experience.json      → Expériences professionnelles
│   ├── missions.json        → Projets BTS + tableau compétences
│   ├── veille.json          → Articles de veille
│   └── contact.json         → (réservé future utilisation)
│
├── composer.json            → Dépendances PHP
└── README.md                → Ce fichier
```

---

## Installation

### Prérequis
- PHP ≥ 8.1
- Composer
- Apache (avec `mod_rewrite`) ou Nginx

### Étapes

```bash
# 1. Cloner ou décompresser le projet
cd portfolio/

# 2. Installer Twig via Composer
composer install

# 3. Configurer le serveur web
#    → DocumentRoot = /chemin/vers/portfolio/public
#    → Pour Apache : activer mod_rewrite + AllowOverride All
#    → Pour Nginx  : voir config ci-dessous

# 4. Tester en local (serveur built-in PHP)
php -S localhost:8080 -t public/
```

### Config Nginx (exemple)
```nginx
server {
    listen 80;
    root /var/www/portfolio/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
    }
}
```

---

## Personnalisation

### 1. Votre identité
Éditez `data/profil.json` :
```json
{
  "prenom": "Jean",
  "nom": "Dupont",
  "initiales": "JD",
  "titre": "Étudiant BTS SIO — Option SLAM",
  ...
}
```

### 2. Vos formations
Éditez `data/parcours.json` → tableau `formations[]`

### 3. Vos stages
Éditez `data/experience.json` → tableau `experiences[]`

### 4. Vos projets BTS
Éditez `data/missions.json` :
- `missions[]` — vos réalisations
- `competences_bts[]` — tableau de compétences avec niveaux

### 5. Votre veille
Éditez `data/veille.json` → tableau `articles[]`

### 6. Ajouter une photo de profil
Placez votre photo dans `public/assets/images/photo.jpg`  
Puis dans `data/profil.json` : `"photo": "/assets/images/photo.jpg"`

---

## Palette de couleurs

### Thème clair

| Variable        | Valeur    | Usage                   |
|-----------------|-----------|-------------------------|
| `--c-bg-0`      | `#FAF7F0` | Fond profond ivoire     |
| `--c-bg-1`      | `#F4EFE2` | Fond base crème         |
| `--c-bg-2`      | `#EBE4D2` | Cartes beige            |
| `--c-bg-3`      | `#E0D8C2` | Éléments élevés         |
| `--c-border`    | `#CFC5A5` | Bordures dorées pâles   |
| `--c-muted`     | `#A8947A` | Texte atténué bronze    |
| `--c-secondary` | `#6B5540` | Texte secondaire brun   |
| `--c-text`      | `#261A0A` | Texte principal profond |
| `--c-gold`      | `#B87A35` | Accent doré chaud       |
| `--c-gold-lt`   | `#CF9E55` | Accent doré clair       |
| `--c-rose`      | `#C07268` | Touche rosée            |

### Thème sombre

| Variable        | Valeur    | Usage               |
|-----------------|-----------|---------------------|
| `--c-bg-0`      | `#08080E` | Fond profond        |
| `--c-bg-1`      | `#0E0F1A` | Fond base           |
| `--c-bg-2`      | `#161828` | Cartes              |
| `--c-bg-3`      | `#1F2238` | Éléments élevés     |
| `--c-border`    | `#2A2E50` | Bordures            |
| `--c-muted`     | `#4E5480` | Texte atténué       |
| `--c-secondary` | `#8B93C8` | Texte secondaire    |
| `--c-text`      | `#DCE0F5` | Texte principal     |
| `--c-gold`      | `#C8965A` | Accent doré         |
| `--c-gold-lt`   | `#E8BA7A` | Accent doré clair   |
