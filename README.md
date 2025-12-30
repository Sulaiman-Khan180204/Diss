# Laravel Starter
This repository can be used as a starting point for developing a Laravel application in Codespaces.  

## Install dependencies
The repository already has Laravel installed. You just need to complete setting up and configuring Laravel before you can start working on your project.
-   In your Codespace, in the terminal enter:
```
composer install
```
-   This will install all the libraries needed for Laravel to work.

## Configure the application using a .env file
-   Create a new file name _.env_ in the root of the codespace.
-   Copy the entire contents of _example.env_ into _.env_
-   In _.env_
    -   Change the `APP_URL` to be the following e.g.
    ```
    APP_URL=https://name-of-codespace-8000.app.github.dev/
    ```
    -   You can get the 'name-of-codespace' from the URL in the browser. It will be two words and a random series of letters and numbers e.g. _special-potato-ppvp74vgxfrg6r_. So for this example I'd enter an APP_URL of:-
    ```
    APP_URL=https://special-potato-ppvp74vgxfrg6r-8000.app.github.dev/
    ```
    -   Change the database settings to the following:
    ```
    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT=3306
    DB_DATABASE=cht2520
    DB_USERNAME=root
    DB_PASSWORD=secret
    ```
-   Save your changes to `.env`
-   In the terminal enter the following:

```
php artisan key:generate
```

This will generate a key that is used to encode potentially sensitive data e.g. session data, cookies etc.

-   Then enter

```
php artisan migrate
```

This will generate some basic database tables that Laravel needs to work.

## Test the installation is successful

In the terminal enter

```
php artisan serve
```

You should be able to view your Laravel app on port 8000 where you will see the 'Let's get started' message.

