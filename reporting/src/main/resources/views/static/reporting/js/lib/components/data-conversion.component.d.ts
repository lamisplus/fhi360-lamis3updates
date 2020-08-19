import { OnDestroy, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { ReportService } from '../services/report.service';
export declare class DataConversionComponent implements OnInit, OnDestroy {
    private stompService;
    private reportService;
    private topicSubscription;
    running: boolean;
    message: any;
    finished: boolean;
    facilities: any[];
    selectedFacilities: any[];
    report: number;
    labTest: any;
    labTests: any[];
    constructor(stompService: RxStompService, reportService: ReportService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    convert(): void;
}
