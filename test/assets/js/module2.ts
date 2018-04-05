import * as _ from 'lodash';

export class Happy {
    private prefix: string = "L";

    explain(message: string) {
        console.log(this.prefix + ': ' + message);
    }

    add(message: string) {
        let element = document.createElement('div');

        // Lodash, currently included via a script, is required for this line to work
        element.innerHTML = _.join(['module2.ts', message], ': ');

        document.body.appendChild(element);
    }
}
