import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RxStompService } from "@stomp/ng2-stompjs";
import { Message } from '@stomp/stompjs';
import { CardViewBoolItemModel, CardViewDateItemModel, CardViewItem } from '@alfresco/adf-core';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
    selector: 'database-sync',
    templateUrl: './database.sync.component.html'
})
export class DatabaseSyncComponent implements OnInit, OnDestroy {
    syncing = false;
    tables = '';
    statusSubscription: Subscription;
    tableSubscription: Subscription;
    syncSubscription: Subscription;
    properties: CardViewItem[] = [];
    statusProperties: CardViewItem[] = [];

    constructor(private stompService: RxStompService) {
    }

    ngOnInit(): void {
        this.statusSubscription = this.stompService.watch("/topic/server-status").subscribe((msg: Message) => {
            this.properties = [];
            this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last contact with Server',
                format: 'DD MMM, YYYY HH:MM'
            }));

            this.properties.push(new CardViewDateItemModel({
                key: 'date',
                value: moment(msg.body),
                label: 'Last successful upload to Server',
                format: 'DD MMM, YYYY HH:MM'
            }))
        });

        this.syncSubscription = this.stompService.watch("/topic/server-status").subscribe((msg: Message) => {
            this.properties = [];
            this.properties.push(new CardViewBoolItemModel({
                key: 'date',
                value: msg.body === 'true',
                label: 'Upload Complete',
            }));

            this.syncing = msg.body === 'false';
        });

        this.tableSubscription = this.stompService.watch("/topic/table-status").subscribe((msg: Message) => {
            this.tables = msg.body
        });
    }

    ngOnDestroy(): void {
        this.statusSubscription.unsubscribe();
        this.tableSubscription.unsubscribe();
        this.syncSubscription.unsubscribe();
    }

    sync() {
        this.syncing = true;
    }

    previousState() {
        window.history.back();
    }


}
