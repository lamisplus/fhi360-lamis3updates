import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DATE_FORMAT, SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '@lamis/web-core';
import { ChronicCare, ChronicCareVm } from '../model/clinic.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment_ from 'moment';
import { Moment } from 'moment';

const moment = moment_;

@Injectable({providedIn: 'root'})
export class ChronicCareService {
    public resourceUrl = '';

    constructor(protected http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/chronic-cares';
    }

    create(chronicCare: ChronicCareVm): Observable<HttpResponse<ChronicCare>> {
        const copy = this.convertDateFromClient(chronicCare);
        return this.http
            .post<ChronicCare>(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res: HttpResponse<ChronicCare>) => this.convertDateFromServer(res)));
    }

    update(chronicCare: ChronicCareVm): Observable<HttpResponse<ChronicCare>> {
        const copy = this.convertDateFromClient(chronicCare);
        return this.http
            .put<ChronicCare>(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res: HttpResponse<ChronicCare>) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<HttpResponse<ChronicCare>> {
        return this.http
            .get<ChronicCare>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .pipe(map((res: HttpResponse<ChronicCare>) => this.convertDateFromServer(res)));
    }

    findByUuid(id: string): Observable<HttpResponse<ChronicCare>> {
        return this.http
            .get<ChronicCare>(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res: HttpResponse<ChronicCare>) => this.convertDateFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getDmScreens() {
        return this.http.get(`${this.resourceUrl}/dm-screens`)
    }

    getTbScreens() {
        return this.http.get(`${this.resourceUrl}/tb-screens`)
    }

    getDmScreenByChronicCare(id: number) {
        return this.http.get(`${this.resourceUrl}/${id}/dm-screens`)
    }

    getTbScreenByChronicCare(id: number) {
        return this.http.get(`${this.resourceUrl}/${id}/tb-screens`)
    }

    getVisitDatesByPatient(patientId: number) {
        return this.http.get<Moment[]>(`${this.resourceUrl}/patient/${patientId}/visit-dates`)
            .pipe(map((res) => {
                    res.forEach(d => moment(d));
                    return res;
                })
            )
    }

    protected convertDateFromServer(res: HttpResponse<ChronicCare>): HttpResponse<ChronicCare> {
        if (res.body) {
            res.body.dateLastCd4 = res.body.dateLastCd4 != null ? moment(res.body.dateLastCd4) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
            res.body.dateLastViralLoad = res.body.dateLastViralLoad != null ? moment(res.body.dateLastViralLoad) : null;
            res.body.dateStartedTbTreatment = res.body.dateStartedTbTreatment != null ? moment(res.body.dateStartedTbTreatment) : null;
        }
        return res;
    }

    protected convertDateFromClient(vm: ChronicCareVm): ChronicCareVm {
        vm.chronicCare = Object.assign({}, vm.chronicCare, {
            dateLastViralLoad: vm.chronicCare.dateLastViralLoad != null && vm.chronicCare.dateLastViralLoad.isValid() ?
                vm.chronicCare.dateLastViralLoad.format(DATE_FORMAT) : null,
            dateVisit: vm.chronicCare.dateVisit != null && vm.chronicCare.dateVisit.isValid() ?
                vm.chronicCare.dateVisit.format(DATE_FORMAT) : null,
            dateLastCd4: vm.chronicCare.dateLastCd4 != null && vm.chronicCare.dateLastCd4.isValid() ?
                vm.chronicCare.dateLastCd4.format(DATE_FORMAT) : null,
            dateStartedTbTreatment: vm.chronicCare.dateStartedTbTreatment != null &&
            vm.chronicCare.dateStartedTbTreatment.isValid() ? vm.chronicCare.dateStartedTbTreatment.format(DATE_FORMAT) : null
        });
        return vm;
    }

}
