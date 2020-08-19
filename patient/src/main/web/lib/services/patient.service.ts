import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
    AuthServerProvider,
    createRequestOption,
    DATE_FORMAT,
    SERVER_API_URL_CONFIG,
    ServerApiUrlConfig
} from '@lamis/web-core';
import { map, share } from 'rxjs/operators';
import { OVC, Patient, StatusHistory } from '../model/patient.model';

import * as moment_ from 'moment';
import { Moment } from 'moment';
import { Facility } from '../model/facility.model';
import { ValidationErrors } from '@angular/forms';
import { Summary } from '../components/summary.widget.component';

const moment = moment_;

type EntityResponseType = HttpResponse<Patient>;
type EntityArrayResponseType = HttpResponse<Patient[]>;

export interface PatientActivity {
    uuid?: string;
    id?: any;
    name?: string;
    icon?: string;
    path?: string;
    editable?: boolean;
    viewable?: boolean;
    deletable?: boolean;
}

export interface PatientTimeline {
    date?: string;
    activities?: PatientActivity[];
}

export interface PatientWidget {
    title: string;
    componentName: string;
    index: number;
    icon?: string;
}

export interface PatientObservation {
    name?: string;
    path?: string;
    icon?: string;
    tooltip?: string;
}

@Injectable({providedIn: 'root'})
export class PatientService {
    public resourceUrl = '';
    public resourceSearchUrl = '';
    private ovcResourceUrl = '';

    constructor(protected http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig,
                private authServerProvider: AuthServerProvider) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/patients';
        this.resourceSearchUrl = serverUrl.SERVER_API_URL + '/api/_search/patients';
        this.ovcResourceUrl = serverUrl.SERVER_API_URL + '/api/ovcs';
    }

    create(data: Patient): Observable<EntityResponseType> {
        const patient = this.convertDateFromClient(data);
        return this.http
            .post<Patient>(this.resourceUrl, patient, {observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(data: Patient): Observable<EntityResponseType> {
        const patient = this.convertDateFromClient(data);
        return this.http
            .put<Patient>(this.resourceUrl, patient, {observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)),
                share());
    }

    find(id: any): Observable<EntityResponseType> {
        return this.http
            .get<Patient>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findByUuid(id: any): Observable<EntityResponseType> {
        return this.http
            .get<Patient>(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<Patient[]>(this.resourceUrl, {params: options, observe: 'response'})
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getOVCByPatient(id: number) {
        return this.http.get<OVC>(`${this.ovcResourceUrl}/patient/${id}`)
    }

    widgets(patientId: number): Observable<PatientWidget[]> {
        return this.http.get<PatientWidget[]>(`${this.resourceUrl}/${patientId}/widgets`, {observe: 'body'})
    }

    observations(patientId: number): Observable<PatientObservation[]> {
        return this.http.get<PatientObservation[]>(`${this.resourceUrl}/${patientId}/observations`, {
            observe: 'body'
        })
    }

    activities(patientId: number, detailed: boolean): Observable<PatientTimeline[]> {
        return this.http.get<PatientTimeline[]>(`${this.resourceUrl}/${patientId}/activities?full=${detailed}`, {observe: 'body'})
            .pipe(map(res => {
                res.sort((t1, t2) => {
                    const d1 = moment(t1.date, 'DD MMM, YYYY');
                    const d2 = moment(t2.date, 'DD MMM, YYYY');
                    return d2.diff(d1);
                });
                return res;
            }))
    }

    getActiveFacility() {
        return this.http.get<Facility>('/api/facilities/active')
    }

    getAllFacility() {
        return this.http.get<Facility[]>('/api/facilities')
    }

    getStates() {
        return this.http.get<any[]>('/api/states')
    }

    getLgasByState(id) {
        return this.http.get<any[]>(`/api/provinces/state/${id}`)
    }

    getStateByLga(id) {
        return this.http.get(`/api/provinces/${id}/state`)
    }

    getFacility(id) {
        return this.http.get(`/api/facilities/${id}`)
    }

    existsByHospitalNumber(hospitalNum: string): Observable<ValidationErrors | null> {
        return this.http.post<boolean>(`${this.resourceUrl}/exists/hospital-number`, {number: hospitalNum})
            .pipe(map((res => res ? {'numberExists': true} : null)));
    }

    getStatusDatesByPatient(patientId: number) {
        return this.http.get<Moment[]>(`/api/client-statuses/patient/${patientId}/status-dates`)
            .pipe(map((res) => {
                    res.forEach(d => moment(d));
                    return res;
                })
            )
    }

    getSummaryForPatient(id: number) {
        return this.http.get<Summary[]>(`${this.resourceUrl}/${id}/summary`)
    }

    saveClientStatus(status: StatusHistory) {
        console.log('Status', status);
        const copy = PatientService.convertStatusFromClient(status);
        console.log('Copy', copy);
        return this.http.post<StatusHistory>('/api/client-statuses', copy, {observe: 'response'})
    }

    updateClientStatus(status: StatusHistory) {
        const copy = PatientService.convertStatusFromClient(status);
        return this.http.put<StatusHistory>('/api/client-statuses', copy, {observe: 'response'})
    }

    findClientStatus(id) {
        return this.http.get<StatusHistory>(`/api/client-statuses/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res: HttpResponse<StatusHistory>) => {
                res.body.dateTracked = res.body.dateTracked != null ? moment(res.body.dateTracked) : null;
                res.body.dateStatus = res.body.dateStatus != null ? moment(res.body.dateStatus) : null;
                res.body.agreedDate = res.body.agreedDate != null ? moment(res.body.agreedDate) : null;
                return res;
            }))
    }

    currentClientStatus(patientId: string) {
        return this.http.get(`/api/client-statuses/patient/${patientId}/current`, {responseType: 'text'})
    }

    getStatusName(id: number) {
        return this.http.get(`/api/client-statuses/${id}/name`, {responseType: 'text'})
    }

    private static convertStatusFromClient(status: StatusHistory): StatusHistory {
        const copy: StatusHistory = Object.assign({}, status, {
                dateStatus: status.dateStatus != null && status.dateStatus.isValid() ? status.dateStatus.format(DATE_FORMAT) : null,
                agreedDate: status.agreedDate != null && status.agreedDate.isValid() ? status.agreedDate.format(DATE_FORMAT) : null,
                dateTracked: status.dateTracked != null && status.dateTracked.isValid() ? status.dateTracked.format(DATE_FORMAT) : null,
            }
        );
        return copy;
    }

    protected convertDateFromClient(patient: Patient): Patient {
        const copy: Patient = Object.assign({}, patient, {
            dob: patient.dateBirth != null && patient.dateBirth.isValid() ? patient.dateBirth.format(DATE_FORMAT) : null,
            dateRegistration: patient.dateRegistration != null && patient.dateRegistration.isValid() ? patient.dateRegistration.format(DATE_FORMAT) : null,
            dateStarted: patient.dateStarted != null && patient.dateStarted.isValid() ? patient.dateStarted.format(DATE_FORMAT) : null,
            dateConfirmedHiv: patient.dateConfirmedHiv != null && patient.dateConfirmedHiv.isValid() ? patient.dateConfirmedHiv.format(DATE_FORMAT) : null,
            dateEnrolledPMTCT: patient.dateEnrolledPMTCT != null && patient.dateEnrolledPMTCT.isValid() ? patient.dateEnrolledPMTCT.format(DATE_FORMAT) : null,
            pregnant: patient.pregnancyStatus === 2,
            breastfeeding: patient.pregnancyStatus === 3
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.name = res.body.surname + ', ' + res.body.otherNames;
            res.body.dateBirth = res.body.dateBirth != null ? moment(res.body.dateBirth) : null;
            res.body.dateRegistration = res.body.dateRegistration != null ? moment(res.body.dateRegistration) : null;
            res.body.dateConfirmedHiv = res.body.dateConfirmedHiv != null ? moment(res.body.dateConfirmedHiv) : null;
            res.body.dateEnrolledPMTCT = res.body.dateEnrolledPMTCT != null ? moment(res.body.dateEnrolledPMTCT) : null;
            res.body.dateStarted = res.body.dateStarted != null ? moment(res.body.dateStarted) : null;
            res.body.pregnancyStatus = res.body.pregnant != null && res.body.pregnant ? 2 : res.body.gender === 'FEMALE' ? 1 : null;
            res.body.pregnancyStatus = res.body.breastfeeding != null && res.body.breastfeeding ? 3 : res.body.gender === 'FEMALE' ? 1 : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((patient: Patient) => {
                patient.name = patient.surname + ', ' + patient.otherNames;
                patient.dateBirth = patient.dateBirth != null ? moment(patient.dateBirth) : null;
                patient.dateRegistration = patient.dateRegistration != null ? moment(patient.dateRegistration) : null;
                patient.dateStarted = patient.dateStarted != null ? moment(patient.dateStarted) : null;
            });
        }
        return res;
    }
}
