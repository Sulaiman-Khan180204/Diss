<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>WhatSupp?</title>
    <link rel="icon" type="image/png" href="/images/favicon.png">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    @yield('content')
    @stack('scripts')
</body>
</html>
