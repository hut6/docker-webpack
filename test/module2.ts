class Happy {
    private prefix: string = "L";

    explain(message: string) {
        console.log(this.prefix + ': ' + message);
    }
}

export default function () {
    let happy = new Happy();
    happy.explain("You are wrong");
    console.log("module2");
}
