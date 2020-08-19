import { Component, OnInit } from "@angular/core";
import { PatientService } from "../services/patient.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'detailed-timeline',
    templateUrl: './detailed.timeline.component.html'
})
export class DetailedTimelineComponent implements OnInit {
    id: number;
    uuid: string;

    constructor(private patientService: PatientService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe(({entity}) => {
            const patient = !!entity && entity.body ? entity.body : entity;
            this.id = patient.id;
            this.uuid = patient.uuid;
        });
    }

    previousState() {
        window.history.back();
    }
}
