import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, take } from 'rxjs/operators';

@Directive({
    selector: '[uniqueHospitalNum]',
    providers: [{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: UniqueHospitalNumValidator,
        multi: true
    }]
})
export class UniqueHospitalNumValidator implements AsyncValidator {
    constructor(private patientService: PatientService) {
    }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return control.valueChanges
            .pipe(
                debounceTime(300),
                take(1),
                switchMap(value => this.patientService.existsByHospitalNumber(value))
            );
    }
}
