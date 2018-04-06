import * as $ from "jquery";

export class Happy {
    private prefix: string = "L";

    explain(message: string) {
        console.log(this.prefix + ': ' + message);
    }

    add(message: string) {
        let element = document.createElement('div');

        element.innerHTML = ['module2.ts', message].join(': ');

        $(document.body).append(element);
    }
}
