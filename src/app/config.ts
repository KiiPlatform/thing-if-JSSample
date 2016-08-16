
var kii = require('kii-cloud-sdk').create();
/*
US   : https://api.kii.com
JP   : https://api-jp.kii.com
SG   : https://api-sg.kii.com
CN3  : https://api-cn3.kii.com
EU   : https://api-eu.kii.com
*/
const APP_HOST_URL = 'https://api.kii.com';
kii.Kii.initializeWithSite("___APPID___", "___APPKEY___", APP_HOST_URL+'/api');

export  { kii, APP_HOST_URL}
