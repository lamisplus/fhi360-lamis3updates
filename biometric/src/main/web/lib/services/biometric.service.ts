import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServerProvider, DATE_FORMAT, SERVER_API_URL_CONFIG, ServerApiUrlConfig } from '@lamis/web-core';
import { map } from 'rxjs/operators';
import { Biometric, Patient } from '../model/biometric.model';
import * as moment_ from 'moment';

const moment = moment_;

type EntityResponseType = HttpResponse<Biometric>;
type EntityArrayResponseType = HttpResponse<Biometric[]>;

@Injectable({providedIn: 'root'})
export class BiometricService {
    public resourceUrl = '';
    proxyUrl = 'http://localhost:8888/api/biometrics';

    constructor(protected http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig,
                private authServerProvider: AuthServerProvider) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/biometrics';
    }

    saveTemplates(biometrics: Biometric[]) {
        biometrics = biometrics.map(biometric => this.convertDateFromClient(biometric));
        return this.http.post(`${this.resourceUrl}/templates`, biometrics, {observe: 'response'})
    }

    getBiometric(id: string) {
        return this.http.get<Biometric>(`${this.resourceUrl}/${id}`)
    }

    getPatient(id: any) {
        return this.http.get<Patient>(`/api/patients/by-uuid/${id}`, {observe: 'body'})
            .pipe(map((res) => {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null
                }
                return res;
            }))
    }

    getReaders(): any {
        return this.getObservableFromFetch(`${this.proxyUrl}/readers`)
    }

    findByPatient(id: number): Observable<EntityArrayResponseType> {
        return this.http
            .get<Biometric[]>(`${this.resourceUrl}/patient/${id}`, {observe: 'response'})
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    identify(reader: string): any {
        const accessToken = this.authServerProvider.getToken();
        let url = new URL(`${this.proxyUrl}/identify`);
        url.searchParams.append('reader', reader);
        url.searchParams.append('server', window.location.host);
        url.searchParams.append('accessToken', accessToken);
        return this.getObservableFromFetch(url);
    }

    protected convertDateFromClient(biometric: Biometric): Biometric {
        const copy: Biometric = Object.assign({}, biometric, {
            date: biometric.date != null && biometric.date.isValid() ? biometric.date.format(DATE_FORMAT) : null,
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((biometric: Biometric) => {
                biometric.date = biometric.date != null ? moment(biometric.date) : null;
            });
        }
        return res;
    }

    getObservableFromFetch(url, opts?) {
        //Create and return an Observable.
        return new Observable(observer => {
            //Make use of Fetch API to get data from URL
            fetch(url, opts || {})
                .then(res => {
                    /*The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
                    return res.json();
                })
                .then(body => {
                    observer.next(body);
                    /*Complete the Observable as it won't produce any more event */
                    observer.complete();
                })
                //Handle error
                .catch(err => observer.error(err));
        })
    }
}
