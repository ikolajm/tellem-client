let APIURL = '';

switch( window.location.hostname) {
    case 'localhost' || '127.0.0.1': 
        APIURL = 'http://localhost:3005';
        break;
    case 'tellem-messenger.herokuapp.com' :
        APIURL = 'https://tellem-messenger.herokuapp.com';
}

export default APIURL;