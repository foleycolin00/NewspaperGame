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
    return Tools;
}());
exports.Tools = Tools;
//# sourceMappingURL=tools.js.map