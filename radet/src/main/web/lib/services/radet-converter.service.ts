import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DATE_FORMAT, SERVER_API_URL_CONFIG, ServerApiUrlConfig } from "@lamis/web-core";
import { Facility } from "../components/radet-converter.component";
import { Observable } from "rxjs";
import * as moment_ from 'moment';

const moment = moment_;

@Injectable()
export class RadetConverterService {
    public resourceUrl = '';

    constructor(private http: HttpClient, @Inject(SERVER_API_URL_CONFIG) private serverUrl: ServerApiUrlConfig) {
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/radet';
    }

    convert(start: Date, end: Date, reportingPeriod: Date, ids: number[], today: any) {
        let params = new HttpParams();
        params = params.append('cohortStart', moment(start).format(DATE_FORMAT));
        params = params.append('cohortEnd', moment(end).format(DATE_FORMAT));
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("today", today);
        ids.forEach(id => params = params.append("ids", id.toString()));
        return this.http.get(`${this.resourceUrl}/convert`, {params})
    }

    listFacilities() {
        return this.http.get<Facility[]>(`${this.resourceUrl}/list-facilities`)
    }

    download(name: string): Observable<Blob> {
        return this.http.get(`${this.resourceUrl}/download/${name}`, {responseType: 'blob'})
    }

    listFiles() {
        return this.http.get<string[]>(`${this.resourceUrl}/list-files`)
    }
}
