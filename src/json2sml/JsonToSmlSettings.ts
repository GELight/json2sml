export default class JsonToSmlSettings {

    public case: number;
    private alreadySet: boolean;

    constructor() {
        this.case = 0;
        this.alreadySet = false;
    }

    public scan(name: string): void {
        if (this.alreadySet) {
            return;
        }

        try {
            if (name.startsWith("2")) {
                this.alreadySet = true;
                this.case = 0;
                return;
            }
            if (name === name.toUpperCase()) {
                this.case = 2;
            } else if (name[0] === name[0].toLowerCase()) {
                this.case = 1;
            }
        } catch (e) {
            // ...
        }
        this.alreadySet = true;
    }

}
