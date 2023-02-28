"use strict";
class Answer {
    constructor(text, isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }
}
class Calculator {
    constructor() {
        this.firstTermPlusMinus = Math.random() < .5;
        this.firstTermBase = Math.round(Math.random() * 10) - 5;
        this.firstTermExponent = Math.round(Math.random() * 3) + 1;
        this.secondTermPlusMinus = Math.random() < .5;
        this.secondTermFirst = Math.round(Math.random() * 10) + 1;
        // this.secondTermTimesDivide = Math.random() < .5
        this.secondTermSecond = Math.round(Math.random() * 10) + 1;
        this.thirdTermPlusMinus = Math.random() < .5;
        this.thirdTerm = Math.round(Math.random() * 10) + 1;
    }
    getBooleanString(b, f, t) {
        return b ? f : t;
    }
    getProblem() {
        const firstTerm = this.getFirstTerm();
        const secondTerm = this.getSecondTerm();
        const thirdTerm = this.getThirdTerm();
        return ["\\text{Find the value of:}",
            `${this.getBooleanString(this.firstTermPlusMinus, "-1\\times", "")}` + firstTerm +
                `${this.getBooleanString(this.secondTermPlusMinus, "-", "+")}` + secondTerm +
                `${this.getBooleanString(this.thirdTermPlusMinus, "-", "+")}` + thirdTerm];
    }
    getCorrectAnswer() {
        const firstTerm = (this.firstTermPlusMinus ? -1 : 1) * Math.pow(this.firstTermBase, this.firstTermExponent);
        const secondTerm = (this.secondTermPlusMinus ? -1 : 1) * this.secondTermFirst * this.secondTermSecond;
        const thirdTerm = (this.thirdTermPlusMinus ? -1 : 1) * this.thirdTerm;
        return firstTerm + secondTerm + thirdTerm;
    }
    getFirstTerm() {
        return `${this.firstTermBase < 0 ? "(" : ""}${this.firstTermBase}${this.firstTermBase < 0 ? ")" : ""}^${this.firstTermExponent}`;
    }
    getSecondTerm() {
        return `${this.secondTermFirst}\\times${this.secondTermSecond}`;
    }
    getThirdTerm() {
        return `${this.thirdTerm}`;
    }
    getAnswers() {
        const correctAnswer = this.getCorrectAnswer();
        var result = [new Answer(`${correctAnswer}`, true)];
        while (result.length < 4) {
            const fakeAnswer = `${correctAnswer + (Math.random() < .5 ? -1 : 1) * Math.round(Math.random() *
                Math.max(5, correctAnswer * .1))}`;
            if (result.findIndex((i) => i.text === fakeAnswer) == -1) {
                result.push(new Answer(fakeAnswer, false));
            }
        }
        return result.sort((i, j) => parseInt(i.text) - parseInt(j.text));
    }
    getExplanation() {
        var result = [];
        result.push("\\text{Solve each term first:}");
        result.push(`${this.getBooleanString(this.firstTermPlusMinus, "-1\\times", "")}${this.getFirstTerm()}` +
            ` = ${(this.firstTermPlusMinus ? -1 : 1) * Math.pow(this.firstTermBase, this.firstTermExponent)}`);
        result.push(`${this.getBooleanString(this.secondTermPlusMinus, "-", "")}${this.getSecondTerm()}` +
            ` = ${(this.secondTermPlusMinus ? -1 : 1) * this.secondTermFirst * this.secondTermSecond}`);
        result.push(`${this.getBooleanString(this.thirdTermPlusMinus, "-", "")}${this.getThirdTerm()}` +
            ` = ${(this.thirdTermPlusMinus ? -1 : 1) * this.thirdTerm}`);
        result.push(`\\text{Then add them up: }${this.getCorrectAnswer()}`);
        return result;
    }
}
class AlgebraFirstOrder {
    constructor() {
        this.firstTermCoef = Math.round(Math.random() * 9) + 1;
        this.secondTerm = (Math.random() < .5 ? -1 : 1) * (Math.round(Math.random() * 4) + 1);
        this.x = Math.round(Math.random() * 10) - 5;
    }
    getAnswer() {
        return this.firstTermCoef * this.x + this.secondTerm;
    }
    getFormula() {
        return `${this.firstTermCoef}x${this.secondTerm < 0 ? "" : "+"}${this.secondTerm}=${this.getAnswer()}`;
    }
    getProblem() {
        return ["\\text{Find the value of }x:", this.getFormula()];
    }
    getAnswers() {
        const correctAnswer = this.x;
        var result = [new Answer(`${correctAnswer}`, true)];
        while (result.length < 4) {
            const fakeAnswer = `${correctAnswer + (Math.random() < .5 ? -1 : 1) * Math.round(Math.random() *
                Math.max(5, correctAnswer * .1))}`;
            if (result.findIndex((i) => i.text === fakeAnswer) == -1) {
                result.push(new Answer(fakeAnswer, false));
            }
        }
        return result.sort((i, j) => parseInt(i.text) - parseInt(j.text));
    }
    getExplanation() {
        return [this.getFormula(),
            `${this.firstTermCoef}x` +
                `=${this.getAnswer()}${this.secondTerm > 0 ? "" : "+"}${this.secondTerm * -1}`,
            `x=\\frac{${this.getAnswer()}${this.secondTerm > 0 ? "" : "+"}${this.secondTerm * -1}} {${this.firstTermCoef}}`,
            `x=${this.x}`];
    }
}
class Quadratic {
    constructor() {
        this.x1 = (Math.random() < .5 ? -1 : 1) * (Math.round(Math.random() * 4) + 1);
        this.x2 = (Math.random() < .5 ? -1 : 1) * (Math.round(Math.random() * 4) + 1);
    }
    getFirstCoef() {
        return -1 * (this.x1 + this.x2);
    }
    getSecondCoef() {
        return this.x1 * this.x2;
    }
    getFormula() {
        return `x^2` +
            (this.getFirstCoef() == 0 ? "" : `${this.getFirstCoef() < 0 ? "" : "+"}${this.getFirstCoef()}x${this.getSecondCoef() < 0 ? "" : "+"}`) +
            `${this.getSecondCoef()}=0`;
    }
    getProblem() {
        return ["\\text{Find a value of }x:", this.getFormula()];
    }
    getAnswers() {
        var result = this.x1 == this.x2 ? [new Answer(`${this.x1}`, true)] : [new Answer(`${this.x1}`, true), new Answer(`${this.x2}`, true)];
        while (result.length < 5) {
            const fakeAnswer = `${this.x1 + (Math.random() < .5 ? -1 : 1) * Math.round(Math.random() *
                Math.max(5, this.x1 * .1))}`;
            if (result.findIndex((i) => i.text === fakeAnswer) == -1) {
                result.push(new Answer(fakeAnswer, false));
            }
        }
        return result.sort((i, j) => parseInt(i.text) - parseInt(j.text));
    }
    getExplanation() {
        return ["\\text{Replace the }x\\text{ with your guess, and see if the result equals 0:}",
            `${this.x1 < 0 ? "(" : ""}${this.x1}${this.x1 < 0 ? ")" : ""}^2` +
                (this.getFirstCoef() == 0 ? "" : `${this.getFirstCoef() < 0 ? "" : "+"}${this.getFirstCoef()}\\times${this.x1}${this.getSecondCoef() < 0 ? "" : "+"}`) +
                `${this.getSecondCoef()}=0`].concat((this.x1 == this.x2 ? [] :
            [`${this.x2 < 0 ? "(" : ""}${this.x2}${this.x2 < 0 ? ")" : ""}^2` +
                    (this.getFirstCoef() == 0 ? "" : `${this.getFirstCoef() < 0 ? "" : "+"}${this.getFirstCoef()}\\times${this.x2}${this.getSecondCoef() < 0 ? "" : "+"}`) +
                    `${this.getSecondCoef()}=0`]));
    }
}
class CircleProblem {
    constructor() {
        this.radius = (Math.round(Math.random() * 14) + 1);
        this.circumferenceOrArea = Math.random() < .5;
        this.radiusOrDiameter = Math.random() < .5;
    }
    getCorrectAnswer() {
        return this.circumferenceOrArea ? 3.14 * 2 * this.radius : 3.14 * this.radius * this.radius;
    }
    getProblem() {
        return [`\\text{A circle has a radius of ${this.radius}}`,
            `\\text{What is the ${this.circumferenceOrArea ? "circumference" : "area"}?}`];
    }
    getAnswers() {
        var result = [new Answer(`${this.getCorrectAnswer().toFixed(2)}`, true)];
        while (result.length < 4) {
            const fakeAnswer = `${Math.max(this.getCorrectAnswer() +
                (Math.random() < .5 ? -1 : 1) * (Math.random() + .1), .1).toFixed(2)}`;
            if (result.findIndex((i) => i.text === fakeAnswer) == -1) {
                result.push(new Answer(fakeAnswer, false));
            }
        }
        return result.sort((i, j) => parseInt(i.text) - parseInt(j.text));
    }
    getExplanation() {
        return [`${this.circumferenceOrArea ?
                "circumference = \\pi \\times diameter = \\pi \\times 2 \\times radius" :
                "area = \\pi \\times radius^2"}`,
            this.circumferenceOrArea ?
                `circumference = 3.14 \\times 2 \\times ${this.radius} = ${this.getCorrectAnswer()}` :
                `area = 3.14 \\times ${this.radius}^2 = ${this.getCorrectAnswer()}`,
        ];
    }
}
