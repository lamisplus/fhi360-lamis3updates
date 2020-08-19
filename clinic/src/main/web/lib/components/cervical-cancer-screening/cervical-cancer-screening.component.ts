import { Component, OnInit } from '@angular/core';
import { CervicalCancerScreening, Patient } from '../../model/clinic.model';
import * as moment_ from 'moment';
import { Moment } from 'moment';

const moment = moment_;

@Component({
    selector: 'cancer-screening',
    templateUrl: './cervical-cancer-screening.component.html'
})
export class CervicalCancerScreeningComponent implements OnInit {
    entity: CervicalCancerScreening;
    patient: Patient;
    today = moment();
    dateRegistration: Moment;

    ngOnInit(): void {

    }
}
