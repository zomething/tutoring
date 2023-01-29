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
    getBooleanString(b, f, t) {
        return b ? f : t;
    }
}
