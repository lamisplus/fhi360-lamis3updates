import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../services/facility.service';
import { NotificationService } from '@alfresco/adf-core';
import { entityCompare } from '@lamis/web-core';
import { Observable } from 'rxjs';

@Component({
    selector: 'lamis-facility',
    templateUrl: './facility.component.html',
    styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
    states: any[];
    lgas: any[];
    facilities: any[];
    active: any;

    facility: any;

    constructor(private facilityService: FacilityService, private notification: NotificationService) {
    }

    ngOnInit() {
        this.facilityService.getStates().subscribe(res => this.states = res);
        this.facility = this.facilityService.getActive().subscribe(res => {
            if (res.body) {
                this.facility = res.body
            }
        })
    }

    entityCompare(e1, e2) {
        return entityCompare(e1, e2);
    }

    stateChanged(id) {
        this.facilityService.getLgaByState(id).subscribe(res => this.lgas = res)
    }

    lgaChanged(id) {
        this.facilityService.getFacilitiesByLga(id).subscribe(res => this.facilities = res)
    }

    setActive() {
        this.facilityService.update(this.active).subscribe(res => {
            if (res.ok && res.body) {
                this.facilityService.getActive().subscribe(r => {
                    if (r.body) {
                        this.facility = r.body
                    }
                });
                this.notification.showInfo(`Facility switched to ${res.body.name}`)
            }
        });
    }
}
