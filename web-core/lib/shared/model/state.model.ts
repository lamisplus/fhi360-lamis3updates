import { IBaseEntity } from './base-entity';

export interface IState extends IBaseEntity {
    id?: number;
    name?: string;
}

export class State implements IState {
    constructor(public id?: number, public name?: string) {
        this.id = id ? id : null;
        this.name = name ? name : null;
    }
}
