"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opponent = void 0;
var newspaper_1 = require("./newspaper");
var Opponent = /** @class */ (function () {
    function Opponent(name) {
        //Sliders
        this.sliders = [50, 50, 50, 50, 50, 50];
        //Ballance - Ranges Will Allow
        this.slidersLeft = [0, 0, 0, 0, 0, 0];
        this.slidersRight = [100, 100, 100, 100, 100, 100];
        //Ballance - How Quick to Move
        this.slidersDeltaLeft = [5, 5, 5, 5, 5, 5];
        this.slidersDeltaRight = [5, 5, 5, 5, 5, 5];
        this.name = name;
    }
    Opponent.generateOpponents = function () {
        var opps = [];
        var o;
        //Opponent 1
        //Classic local
        o = new Opponent("Opponent 1");
        o.localPopularity = 50;
        o.nationalPercent = 5;
        o.sliders = [50, 50, 50, 50, 50, 50];
        opps.push(o);
        //Opponent 1
        //Tabloid
        o = new Opponent("Opponent 2");
        o.localPopularity = 15;
        o.nationalPercent = 25;
        o.sliders = [10, 0, 75, 100, 50, 0];
        opps.push(o);
        //Opponent 1
        //Negative National
        o = new Opponent("Opponent 3");
        o.localPopularity = 5;
        o.nationalPercent = 30;
        o.sliders = [25, 75, 0, 75, 75, 15];
        opps.push(o);
        //Opponent 1
        //Really good national
        o = new Opponent("Opponent 4");
        o.localPopularity = 0;
        o.nationalPercent = 40;
        o.sliders = [100, 100, 0, 50, 100, 0];
        opps.push(o);
        return opps;
    };
    Opponent.prototype.generatePaper = function (date) {
        //TODO Opponent AI
        return new newspaper_1.Newspaper(date, this.sliders);
    };
    return Opponent;
}());
exports.Opponent = Opponent;
//# sourceMappingURL=opponent.js.map