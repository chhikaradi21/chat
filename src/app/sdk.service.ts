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

}
