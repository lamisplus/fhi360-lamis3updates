export interface IBaseEntity {
    id?: number | string;
}

export interface IAggregate {
    field?: string;
    key?: string;
}

export class Aggregate implements IAggregate {
    constructor(public field: string, public key: any) {
    }
}


export function remove<T extends IBaseEntity>(array: T[], element: T): T[] {
    return array.filter(e => e.id !== element.id);
}

export function clear<T>(array: T[]): T[] {
    array.length = 0;
    return array;
}

export function contains<T extends IBaseEntity>(array: T[], element: T): boolean {
    return array.filter(e => e.id === element.id).length > 0;
}

export function entityCompare<T extends IBaseEntity>(e1: T, e2: T): boolean {
    return e1 && e2 ? e1.id == e2.id : e1 === e2
}

export function enumCompare(e1: any, e2: any): boolean {
    return (e1 !== undefined && e2 !== undefined) ? e1.valueOf() == e2.valueOf() : e1 === e2;
}

export function replace<T extends IBaseEntity>(array: T[], element: T): T[] {
    let result = remove(array, element);
    result.push(element);
    return result;
}
