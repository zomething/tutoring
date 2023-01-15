"use strict";
class Answer {
    constructor(text, isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }
}
class Quadratic {
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
        return ["Find the value of:",
            `${this.getBooleanString(this.firstTermPlusMinus, "-", "")}` + firstTerm +
                `${this.getBooleanString(this.secondTermPlusMinus, " - ", " + ")}` + secondTerm +
                `${this.getBooleanString(this.thirdTermPlusMinus, " - ", " + ")}` + thirdTerm];
    }
    getCorrectAnswer() {
        const firstTerm = (this.firstTermPlusMinus ? -1 : 1) * Math.pow(this.firstTermBase, this.firstTermExponent);
        const secondTerm = (this.secondTermPlusMinus ? -1 : 1) * this.secondTermFirst * this.secondTermSecond;
        const thirdTerm = (this.thirdTermPlusMinus ? -1 : 1) * this.thirdTerm;
        return firstTerm + secondTerm + thirdTerm;
    }
    getFirstTerm() {
        return `${this.firstTermBase < 0 ? "(" : ""}${this.firstTermBase}${this.firstTermBase < 0 ? ")" : ""}<sup>${this.firstTermExponent}</sup>`;
    }
    getSecondTerm() {
        return `${this.secondTermFirst}x${this.secondTermSecond}`;
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
        var result = []; //this.getProblem().slice(1)
        result.push("<b>Solve each term first:</b>");
        result.push(`&nbsp;&nbsp;&nbsp;&nbsp;` +
            `${this.getBooleanString(this.firstTermPlusMinus, "-", "")}${this.getFirstTerm()}` +
            ` = ${(this.firstTermPlusMinus ? -1 : 1) * Math.pow(this.firstTermBase, this.firstTermExponent)}`);
        result.push(`&nbsp;&nbsp;&nbsp;&nbsp;` +
            `${this.getBooleanString(this.secondTermPlusMinus, "-", "")}${this.getSecondTerm()}` +
            ` = ${(this.secondTermPlusMinus ? -1 : 1) * this.secondTermFirst * this.secondTermSecond}`);
        result.push(`&nbsp;&nbsp;&nbsp;&nbsp;` +
            `${this.getBooleanString(this.thirdTermPlusMinus, "-", "")}${this.getThirdTerm()}` +
            ` = ${(this.thirdTermPlusMinus ? -1 : 1) * this.thirdTerm}`);
        result.push(`<b>Then add them up: ${this.getCorrectAnswer()}</b>`);
        return result;
    }
}
