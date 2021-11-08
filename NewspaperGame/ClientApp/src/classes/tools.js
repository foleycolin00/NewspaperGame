"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tools = void 0;
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.TrimNumber = function (n) {
        if (n < 0) {
            return 0;
        }
        else if (n > 100) {
            return 100;
        }
        else {
            return n;
        }
    };
    Tools.getRatingString = function (rating) {
        if (rating < 60)
            return "F";
        else if (rating < 63)
            return "D-";
        else if (rating < 67)
            return "D";
        else if (rating < 70)
            return "D+";
        else if (rating < 73)
            return "C-";
        else if (rating < 77)
            return "C";
        else if (rating < 80)
            return "C+";
        else if (rating < 83)
            return "B-";
        else if (rating < 87)
            return "B";
        else if (rating < 90)
            return "B+";
        else if (rating < 93)
            return "A-";
        else if (rating < 97)
            return "A";
        else
            return "A+";
    };
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map