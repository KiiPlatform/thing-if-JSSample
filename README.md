# Deprecation Notice
Since it is difficult to maintain this repository, which built with old version of angular, we finally decided to terminate its maintenances.
For browser sample of thing-if-JSSDK, please refer [the new react sample](https://github.com/KiiPlatform/thing-if-ReactSample)

# thing-if-JSSample

Kii cloud JS SDK Sample web application using Angular 2 and Bootstrap 4.

## Based on

- Awesome Admin panel framework based on Angular 2, Bootstrap 4 and Webpack ([NG2](http://akveo.com/ng2-admin/))
- RxJS

## dependency
- bower (please install with `npm install -g bower`)


## Installation


1. Clone this repository :

    ```bash
    git clone https://github.com/KiiPlatform/thing-if-JSSample
    ```

1. Go to the repository folder and modify `src/app/config.ts` 

    ```javascript
    const APP_HOST_URL = 'https://api.kii.com';
    kii.Kii.initializeWithSite("___APPID___", "___APPKEY___",APP_HOST_URL+'/api');
    ```

    Change above `___APPID___` , `___APPKEY___`, `APP_HOST_URL` with your kii apps credentials.

1. Go to the root repository folder and run bellow on your bash terminal

    ```bash
    npm install && npm start
    ```

1. Open your browser and access `http://0.0.0.0:3000/`

1. Login with your pre registered Kii User (this version does not have user registration functionality)

## UI Features
* TypeScript
* Webpack
* Responsive layout
* High resolution
* Bootstrap 4 CSS Framework
* Sass
* Angular 2
* jQuery
* Charts (Chartist, Chart.js)

## KiiCloud Features
* Login
* Display onboarding result
* Display Thing state
* Send command with predefined scheme (smart-light)
* Create, Read, Update, Delete Triggers 

##License
[APACHE v.2](LICENSE.txt) license.
