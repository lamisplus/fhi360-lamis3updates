import { Facility } from './facility.model';
import { Moment } from 'moment';

export function age(dob: Moment) {
    const diff_ms = Date.now() - dob.milliseconds();
    const age_dt = new Date(diff_ms);

    let age = Math.abs(age_dt.getUTCFullYear() - 1970);
    if (age > 0) {
        return age + ' year(s)'
    }

    age = new Date().getMonth() - dob.month() +
        (12 * (new Date().getFullYear() - dob.year()));
    const weeks = Math.round((Date.now() - dob.milliseconds()) / (7 * 24 * 60 * 60 * 1000));
    if (age > 0 && weeks >= 4) {
        return age + ' month(s)';
    }
    return weeks + ' week(s)';
}

export const enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    MALE_TO_FEMALE = 'MALE_TO_FEMALE',
    FEMALE_TO_MALE = 'FEMALE_TO_MALE'
}

export const enum MaritalStatus {
    SINGLE = 'SINGLE',
    MARRIED = 'MARRIED',
    CONCUBINAGE = 'CONCUBINAGE',
    WIDOWED = 'WIDOWED',
    DIVORCED = 'DIVORCED',
    SEPARATED = 'SEPARATED'
}

export const enum BloodType {
    A = 'A',
    B = 'B',
    AB = 'AB',
    O = 'O'
}

export const enum Rhesus {
    POS = 'POS',
    NEG = 'NEG'
}

export const enum HB {
    AA = 'AA',
    AS = 'AS',
    SS = 'SS',
    SC = 'SC',
    CC = 'CC',
    ATHAL = 'ATHAL',
    BTHAL = 'BTHAL'
}

export interface Patient {
    facility?: Facility;
    id?: number;
    hospitalNum?: string;
    uniqueId?: string;
    name?: string;
    surname?: string;
    otherNames?: string;
    gender?: Gender;
    dateBirth?: Moment;
    dod?: Moment;
    archived?: boolean;
    maritalStatus?: MaritalStatus;
    criticalInfo?: string;
    generalInfo?: string;
    education?: string;
    occupation?: string;
    address?: string;
    phone?: string;
    nextKin?: string;
    addressKin?: string;
    phoneKin?: string;
    relationKin?: string;
    entryPoint?: string;
    targetGroup?: string;
    dateConfirmedHiv?: Moment;
    dateEnrolledPMTCT?: Moment;
    sourceReferral?: string;
    timeHivDiagnosis?: string;
    tbStatus?: string;
    pregnant?: boolean;
    breastfeeding?: boolean;
    dateRegistration?: Moment;
    statusRegistration?: string;
    enrollmentSetting?: string;
    dateStarted?: Moment;
    otherInfo?: string;
}
