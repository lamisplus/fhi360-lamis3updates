import { IBaseEntity } from './base-entity';
import { ILGA } from './lga.model';

export  enum FacilityType {
    DOCTOR_OFFICE, PRIMARY_CARE, CLINIC, HOSPITAL, SPECIALIZED, NURSING_HOME, HOSPICE, RURAL
}

export enum PublicLevel {
    PRIVATE, PUBLIC, MIXED
}

export interface Facility extends IBaseEntity {
    id?: number;
    name?: string;
    code?: string;
    lga?: ILGA;
    type?: FacilityType;
    publicLevel?: PublicLevel
    teaching?: boolean;
    extra?: string;
}