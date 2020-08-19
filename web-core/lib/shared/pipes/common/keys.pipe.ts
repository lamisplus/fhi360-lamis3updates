import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'keys1'})
export class KeysPipe implements PipeTransform {
    transform(value, args: string[]): any {
        let keys = [];
        for (let enumMember in value) {
            if (!isNaN(parseInt(enumMember, 10))) {
                keys.push({key: enumMember, value: value[enumMember]});
            }
        }
        console.log('Keys', keys);
        return keys;
    }
}
