<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\Extension\DebugExtension;

// ─── Twig Setup ──────────────────────────────────────────────────────────────
$loader = new FilesystemLoader(__DIR__ . '/../templates');
$twig = new Environment($loader, [
    'cache' => false, // Mettre en true + chemin en prod
    'debug' => true,
    'auto_reload' => true,
]);
$twig->addExtension(new DebugExtension());

// ─── Router ──────────────────────────────────────────────────────────────────
$uri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

// Retirer le prefix si en sous-dossier
$base = ''; // À adapter si le projet est dans un sous-dossier
$uri = $base ? ltrim(substr($uri, strlen($base)), '/') : $uri;

$routes = [
    ''          => 'accueil',
    'accueil'   => 'accueil',
    'parcours'  => 'parcours',
    'experience'=> 'experience',
    'veille'    => 'veille',
    'profil'    => 'profil',
    'missions'  => 'missions',
    'contact'   => 'contact',
];

$page = $routes[$uri] ?? null;

if ($page === null) {
    http_response_code(404);
    echo $twig->render('pages/404.twig', ['currentPage' => '']);
    exit;
}

// ─── Data Loading ────────────────────────────────────────────────────────────
function loadData(string $name): array {
    $path = __DIR__ . "/../data/{$name}.json";
    if (!file_exists($path)) return [];
    $content = file_get_contents($path);
    return json_decode($content, true) ?? [];
}

$context = [
    'currentPage' => $page,
    'nav' => [
        ['slug' => 'accueil',    'label' => 'Accueil',      'icon' => 'home'],
        ['slug' => 'profil',     'label' => 'Profil',       'icon' => 'user'],
        ['slug' => 'parcours',   'label' => 'Parcours',     'icon' => 'graduation-cap'],
        ['slug' => 'experience', 'label' => 'Expérience',   'icon' => 'briefcase'],
        ['slug' => 'missions',   'label' => 'Missions',     'icon' => 'layers'],
        ['slug' => 'veille',     'label' => 'Veille',       'icon' => 'rss'],
        ['slug' => 'contact',    'label' => 'Contact',      'icon' => 'mail'],
    ],
];

// Charger les données spécifiques à la page
$context['data'] = loadData($page);

// Données globales
$context['profil'] = loadData('profil');

echo $twig->render("pages/{$page}.twig", $context);
