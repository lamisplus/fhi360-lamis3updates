import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

@Pipe({
    name: 'naira'
})
export class NairaPipe implements PipeTransform {
    private pipe = new CurrencyPipe('en');

    transform(value: any, ...args: any[]) {
        return this.pipe.transform(value, '₦');
    }
}
