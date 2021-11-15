"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opponent = void 0;
var opponents_component_1 = require("../app/opponents/opponents.component");
var newspaper_1 = require("./newspaper");
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
        o = new Opponent("The Raleigh Times", 0);
        o.popularity = 10;
        o.sliders = [60, 80, 30, 30, 20, 70];
        opps.push(o);
        //Opponent 1
        //Tabloid
        o = new Opponent("Entertainment News", 3);
        o.popularity = 40;
        o.sliders = [10, 0, 75, 100, 75, 0];
        opps.push(o);
        //Opponent 1
        //Negative National
        o = new Opponent("Angry Rant News", 4);
        o.popularity = 15;
        o.sliders = [25, 75, 0, 75, 75, 15];
        opps.push(o);
        //Opponent 1
        //Really good national
        o = new Opponent("National Press", 1);
        o.popularity = 30;
        o.sliders = [100, 80, 20, 40, 100, 10];
        opps.push(o);
        opponents_component_1.OpponentsComponent.opponents = opps;
        return opps;
    };
    Opponent.prototype.generatePaper = function (date) {
        return new newspaper_1.Newspaper(date, this.sliders);
    };
    Opponent.prototype.shiftSliders = function () {
        //for (let i = 0; i < this.sliders.length; i++) {
        //  //Shifts the focus to the right and everything else to the left
        //  //Use the rating method to see what the rating would be.
        //  //Check what the rating would be for every change in sliders
        //  //Maximize the focus slider, so assuming you increase that one, what other options would increase your score?
        //  //loop through every option change for every slider, maybe by 5 or 10
        //  if (this.focus == i) {
        //    if (this.sliders[i] + this.slidersDeltaRight[i] >= this.slidersRight[i]) {
        //      this.sliders[i] = Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i] * 2);
        //    }
        //  } else {
        //    if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
        //      this.sliders[i] = Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
        //    }
        //  }
        //}
        this.sliders = this.abMax(this.sliders, 6, 0)[0];
    };
    Opponent.prototype.abMax = function (opponentSliders, maxDepth, currentDepth) {
        if (maxDepth === void 0) { maxDepth = 6; }
        //If we are on the have evaluated all the sliders, return the rating
        if (currentDepth == maxDepth) {
            return [opponentSliders, this.getSlidersRating(opponentSliders)];
        }
        //Follow what our best slider config is and what our best popularity number is
        var bestSliders = null;
        var bestPopularity = -Infinity;
        var possibleMoves = [-5, -10, -15, 5, 10, 15];
        var index = 0;
        //If this slider is the opponents focus, then only allow it to go forward
        if (currentDepth == this.focus) {
            index = 3;
        }
        //Run through every possible move of the slider from 5,10,15,-5,-10,-15
        for (var i = index; i < possibleMoves.length; i++) {
            //Add this possible move to the sliders
            var newSliders = opponentSliders;
            newSliders[currentDepth] += possibleMoves[i];
            //Run the method again with this new change implemented
            var _a = this.abMax(newSliders, maxDepth, currentDepth + 1), recurseSliders = _a[0], currentPopularity = _a[1];
            //Check if this move improved the sliders
            if (currentPopularity > bestPopularity) {
                bestPopularity = currentPopularity;
                bestSliders = recurseSliders;
            }
        }
        return [bestSliders, bestPopularity];
    };
    Opponent.prototype.getSlidersRating = function (sliders) {
        var ideal = [100, 100, 50, 0, 50, 100];
        var weights = [1, 1, 2, 1, 2, 1];
        //Get rating out of 600, with 600 being the lowest
        var rating = sliders.map(function (s, index) { return Math.abs(s - ideal[index]) * weights[index]; }).reduce(function (p, c) { return p + c; });
        //Get out of 100, with 100 being the lowest
        rating = Math.round(rating / 6);
        //Get out of 100, with 100 being the highest
        rating = Math.abs(rating - 100);
        //Mathmatically, currently the highest rating you could get is an 88
        rating = Math.round(rating / 88 * 100);
        return rating;
    };
    return Opponent;
}());
exports.Opponent = Opponent;
//# sourceMappingURL=opponent.js.map