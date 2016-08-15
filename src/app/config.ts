
var kii = require('kii-cloud-sdk').create();
/*
US   : https://api.kii.com
JP   : https://jp-api.kii.com
SG   : https://sg-api.kii.com
CN3  : https://cn3-api.kii.com
EU   : https://eu-api.kii.com
*/
const APP_HOST_URL = '___APP_SITE__';
kii.Kii.initializeWithSite("___APPID___", "___APPKEY___", APP_HOST_URL+'/api');

export  { kii, APP_HOST_URL}
