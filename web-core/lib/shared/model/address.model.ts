import { ILGA } from './lga.model';

export interface IAddress {
    street1?: string;
    street2?: string;
    city?: string;
    lga?: ILGA;
}

export class Address implements IAddress {
    constructor(
        public street1?: string,
        public street2?: string,
        public city?: string,
        public lga?: ILGA
    ) {
        this.street1 = street1 ? street1 : null;
        this.street2 = street2 ? street2 : null;
        this.city = city ? city : null;
        this.lga = lga ? lga : null;
    }
}

export class PersonName {
    constructor(private title?: string, private firstName?: string, private middleName?: string, private surname?: string){}
}

export class Phone {
    constructor(private phone1?: string, private phone2?: string) {}
}
