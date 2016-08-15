# thing-if-JSSample

Kii cloud JS SDK Sample web application using Angular 2 and Bootstrap 4.

### Based on

- Awesome Admin panel framework based on Angular 2, Bootstrap 4 and Webpack [NG2](http://akveo.com/ng2-admin/)
- RxJS

## Installation

Clone this repository :

```bash
git clone https://github.com/KiiPlatform/thing-if-JSSample
```

Go to the repository folder and modify `src/app/config.ts` 

```javascript
kii.Kii.initializeWithSite("___APPID___", "___APPKEY___", kii.KiiSite.US);
```

Change above `___APPID___` , `___APPKEY___`, `kii.KiiSite.US` with your kii apps credentials.

Go to the root repository folder and run bellow on your bash terminal

```bash
npm install \
&& npm start
```

4. Open your browser and access `http://0.0.0.0:3000/`

5. Login with your pre registered Kii User (this version does not have register functionality)

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
[MIT](LICENSE.txt) license.
