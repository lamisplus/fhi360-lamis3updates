import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PagingParamsResolve implements Resolve<any> {
    paginationUtil: any;

    constructor(private injector: Injector) {
        this.paginationUtil = this.injector.get(JhiPaginationUtil);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const query = route.queryParams['query'] ? route.queryParams['query'] : '';
        const filter = route.queryParams['filter'] ? route.queryParams['filter'] : '';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: +page,
            query: query,
            filter: filter,
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}
