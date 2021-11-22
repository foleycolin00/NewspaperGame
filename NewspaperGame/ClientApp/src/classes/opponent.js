"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opponent = void 0;
var opponents_component_1 = require("../app/opponents/opponents.component");
var newspaper_1 = require("./newspaper");
var tools_1 = require("./tools");
var Opponent = /** @class */ (function () {
    function Opponent(name, focus) {
        this.popChange = 0;
        this.ratingChange = 0;
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
        o = new Opponent("The Raleigh Times", [0, 1, 2]);
        o.popularity = 10;
        o.sliders = [60, 60, 60, 45, 40, 40];
        o.rating = 90;
        opps.push(o);
        //Opponent 1
        //Tabloid
        o = new Opponent("Entertainment News", [2, 3, 4]);
        o.popularity = 20;
        o.sliders = [40, 40, 55, 60, 55, 40];
        o.rating = 76;
        opps.push(o);
        //Opponent 1
        //Negative National
        o = new Opponent("Angry Rant News", [3, 4, 5]);
        o.popularity = 10;
        o.sliders = [45, 45, 50, 60, 60, 60];
        o.rating = 60;
        opps.push(o);
        //Opponent 1
        //Really good national
        o = new Opponent("National Press", [0, 1, 4]);
        o.popularity = 20;
        o.sliders = [60, 60, 40, 40, 60, 40];
        o.rating = 98;
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
            //Use the rating method to see what the rating would be.
            //Check what the rating would be for every change in sliders
            //Maximize the focus slider, so assuming you increase that one, what other options would increase your score?
            //loop through every option change for every slider, maybe by 5 or 10
            if (this.focus.includes(i)) {
                console.log(this.sliders[i] + this.slidersDeltaRight[i]);
                if (this.sliders[i] + this.slidersDeltaRight[i] <= this.slidersRight[i]) {
                    this.sliders[i] = tools_1.Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i]);
                }
            }
            else {
                if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
                    this.sliders[i] = tools_1.Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
                }
            }
        }
        //this.sliders = this.abMax(this.sliders, 6, 0)[0]
        console.log(this.name + ": " + this.sliders);
    };
    return Opponent;
}());
exports.Opponent = Opponent;
//# sourceMappingURL=opponent.js.map