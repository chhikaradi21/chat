import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SdkService} from './sdk.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    message = '';
    messagesArr = [];
    apiKey = 'apiKey';
    chatBotID = 63906;
    externalID = 'chirag1';
    userName = 'Chirag';

    constructor(private networkService: SdkService) {
    }

    sendQuery(message) {
        const scb = (response) => {
            console.log(response);
            this.messagesArr.push({'query': message, reply: (response && response.message && response.message.message) || ''});
            console.log(this.messagesArr);
        };

        const fcb = (response) => {
            console.log(response);
        };

        const params = {
            apiKey: this.apiKey,
            message: message,
            chatBotID: this.chatBotID,
            externalID: this.externalID
        };
        this.networkService.sendQuery(params, scb, fcb);
    }

    ngOnInit() {
        console.log('hahaha');
    }

}
