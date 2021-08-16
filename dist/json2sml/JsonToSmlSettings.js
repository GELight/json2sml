"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonToSmlSettings {
    constructor() {
        this.case = 0;
        this.alreadySet = false;
    }
    scan(name) {
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
            }
            else if (name[0] === name[0].toLowerCase()) {
                this.case = 1;
            }
        }
        catch (e) {
        }
        this.alreadySet = true;
    }
}
exports.default = JsonToSmlSettings;
//# sourceMappingURL=JsonToSmlSettings.js.map