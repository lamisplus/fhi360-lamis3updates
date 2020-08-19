import { IBaseEntity } from './base-entity';
import { IState } from './state.model';

export interface ILGA extends IBaseEntity {
    id?: number;
    name?: string;
    state?: IState;
}

export class LGA implements ILGA {
    constructor(public id?: number, public name?: string, public state?: IState) {
        this.id = id ? id : null;
        this.name = name ? name : null;
        this.state = state ? state : null;
    }
}
