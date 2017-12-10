import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class SdkService {

    constructor(private http: Http) {

    }

    API_PREFIX = 'https://www.personalityforge.com/';

    getEncodedURL(params, url) {
        let value = '';
        let furl: string = url;
        let key: string;
        for (key in params) {
            if (params.hasOwnProperty(key)) {
                if (typeof(params[key]) === 'object') {
                    value = JSON.stringify(params[key]);
                } else {
                    value = params[key];
                }

                if (furl.indexOf('?') !== -1) {
                    furl += '&' + key + '=' + encodeURIComponent(value);
                } else {
                    furl += '?' + key + '=' + encodeURIComponent(value);
                }
            }
        }
        return furl;
    }

    sendAjaxForGet(pUrl, scb, fcb) {
        const scope = this;
        this.http.get(pUrl)
            .subscribe(
                function (response) {
                    scb(JSON.parse(response['_body']));
                },
                function (error) {
                    fcb(error);
                },
                function () {
                    console.log('call handled successfully');
                }
            );
    }

    sendQuery(params, scb, fcb) {
        const url = this.API_PREFIX + this.getEncodedURL(params, 'api/chat/');
        console.log(url);
        this.sendAjaxForGet(url, scb, fcb);
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
    }

    getCookie(cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            const indexOfKey = c.indexOf(name);
            if (indexOfKey !== -1) {
                return c.substring(indexOfKey + name.length, c.length);
            }
        }
        return '';
    }

}
