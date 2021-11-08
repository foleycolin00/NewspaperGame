"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opponent = void 0;
var opponents_component_1 = require("../app/opponents/opponents.component");
var newspaper_1 = require("./newspaper");
var tools_1 = require("./tools");
var Opponent = /** @class */ (function () {
    function Opponent(name, focus) {
        //Percentage Changes
        this.shiftSliderPercentage = 1;
        this.popDelta = 0;
        //Sliders
        //Index explanation:
        //0 = Journalism, 1 = Content, 2 = Tone, 3 = Sensationalism
        //4 = Nationalization, 5 = Syndication
        this.sliders = [50, 50, 50, 50, 50, 50];
        //Balance - Ranges Will Allow
        this.slidersLeft = [0, 0, 0, 0, 0, 0];
        this.slidersRight = [100, 100, 100, 100, 100, 100];
        //Balance - How Quick to Move
        this.slidersDeltaLeft = [5, 5, 5, 5, 5, 5];
        this.slidersDeltaRight = [5, 5, 5, 5, 5, 5];
        this.name = name;
        //Same explanation as slider index
        this.focus = focus;
    }
    Opponent.generateOpponents = function () {
        var opps = [];
        var o;
        //Opponent 1
        //Classic local
        o = new Opponent("Opponent 1", 0);
        o.popularity = 10;
        o.sliders = [50, 50, 50, 50, 50, 50];
        opps.push(o);
        //Opponent 1
        //Tabloid
        o = new Opponent("Opponent 2", 3);
        o.popularity = 15;
        o.sliders = [10, 0, 75, 100, 50, 0];
        opps.push(o);
        //Opponent 1
        //Negative National
        o = new Opponent("Opponent 3", 4);
        o.popularity = 5;
        o.sliders = [25, 75, 0, 75, 75, 15];
        opps.push(o);
        //Opponent 1
        //Really good national
        o = new Opponent("Opponent 4", 1);
        o.popularity = 40;
        o.sliders = [100, 100, 0, 50, 100, 0];
        opps.push(o);
        opponents_component_1.OpponentsComponent.opponents = opps;
        return opps;
    };
    Opponent.prototype.generatePaper = function (date) {
        return new newspaper_1.Newspaper(date, this.sliders);
    };
    Opponent.prototype.shiftSliders = function () {
        for (var i = 0; i < this.sliders.length; i++) {
            //Shifts the focus to the right and everything else to the left
            if (this.focus == i) {
                if (this.sliders[i] + this.slidersDeltaRight[i] >= this.slidersRight[i]) {
                    this.sliders[i] = tools_1.Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i] * 2);
                }
            }
            else {
                if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
                    this.sliders[i] = tools_1.Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
                }
            }
        }
    };
    return Opponent;
}());
exports.Opponent = Opponent;
//# sourceMappingURL=opponent.js.map