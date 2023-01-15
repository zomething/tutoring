class Answer {
    public readonly text: string
    public readonly isCorrect: boolean

    constructor(text: string, isCorrect: boolean) {
        this.text = text
        this.isCorrect = isCorrect
    }
}

interface MathProblem {
    getProblem(): string[]
    getAnswers(): Answer[]
    getExplanation(): string[]
}

class Quadratic implements MathProblem {
    readonly firstTermPlusMinus: boolean
    readonly firstTermBase: number
    readonly firstTermExponent: number
    readonly secondTermPlusMinus: boolean
    readonly secondTermFirst: number
    // readonly secondTermTimesDivide: boolean
    readonly secondTermSecond: number
    readonly thirdTermPlusMinus: boolean
    readonly thirdTerm: number

    constructor() {
        this.firstTermPlusMinus = Math.random() < .5
        this.firstTermBase = Math.round(Math.random() * 10) - 5
        this.firstTermExponent = Math.round(Math.random() * 3) + 1
        this.secondTermPlusMinus = Math.random() < .5
        this.secondTermFirst = Math.round(Math.random() * 10) + 1
        // this.secondTermTimesDivide = Math.random() < .5
        this.secondTermSecond = Math.round(Math.random() * 10) + 1
        this.thirdTermPlusMinus = Math.random() < .5
        this.thirdTerm = Math.round(Math.random() * 10) + 1
    }

    private getBooleanString(b: boolean, f: string, t: string): string {
        return b ? f : t
    }

    getProblem(): string[] {
        const firstTerm = this.getFirstTerm()
        const secondTerm = this.getSecondTerm()
        const thirdTerm = this.getThirdTerm()
        return ["Find the value of:", 
        `${this.getBooleanString(this.firstTermPlusMinus, "-1x", "")}`+firstTerm+
        `${this.getBooleanString(this.secondTermPlusMinus, " - ", " + ")}`+secondTerm+
            `${this.getBooleanString(this.thirdTermPlusMinus, " - ", " + ")}`+thirdTerm]
    }

    private getCorrectAnswer() {
        const firstTerm = (this.firstTermPlusMinus ? -1 : 1) * Math.pow(this.firstTermBase, this.firstTermExponent)
        const secondTerm = (this.secondTermPlusMinus ? -1 : 1) * this.secondTermFirst * this.secondTermSecond
        const thirdTerm = (this.thirdTermPlusMinus ? -1 : 1) * this.thirdTerm
        return firstTerm + secondTerm + thirdTerm
    }
    
    private getFirstTerm(): string {
        return `${this.firstTermBase < 0 ? "(" : ""}${this.firstTermBase}${this.firstTermBase < 0 ? ")" : ""}<sup>${this.firstTermExponent}</sup>`
    }

    private getSecondTerm(): string {
        return `${this.secondTermFirst}x${this.secondTermSecond}`
    }

    private getThirdTerm(): string {
        return `${this.thirdTerm}`
    }

    getAnswers(): Answer[] {
        const correctAnswer = this.getCorrectAnswer()
        var result = [new Answer(`${correctAnswer}`, true)]
        while (result.length < 4) {
            const fakeAnswer = `${correctAnswer + (Math.random() < .5 ? -1 : 1) * Math.round(Math.random() * 
                Math.max(5, correctAnswer * .1))}`
            if (result.findIndex((i) => i.text === fakeAnswer) == -1) {
                result.push(new Answer(fakeAnswer, false))
            }
        }
        return result.sort((i,j) => parseInt(i.text) - parseInt(j.text))
    }

    getExplanation(): string[] {
        var result = [] //this.getProblem().slice(1)
        result.push("<b>Solve each term first:</b>") 
        result.push(`&nbsp;&nbsp;&nbsp;&nbsp;` +
        `${this.getBooleanString(this.firstTermPlusMinus, "-1x", "")}${this.getFirstTerm()}` +
        ` = ${(this.firstTermPlusMinus ? -1 : 1) * Math.pow(this.firstTermBase, this.firstTermExponent)}`)
        result.push(`&nbsp;&nbsp;&nbsp;&nbsp;` + 
        `${this.getBooleanString(this.secondTermPlusMinus, "-", "")}${this.getSecondTerm()}` +
        ` = ${(this.secondTermPlusMinus ? -1 : 1) * this.secondTermFirst*this.secondTermSecond}`)
        result.push(`&nbsp;&nbsp;&nbsp;&nbsp;` + 
        `${this.getBooleanString(this.thirdTermPlusMinus, "-", "")}${this.getThirdTerm()}` + 
        ` = ${(this.thirdTermPlusMinus ? -1 : 1) * this.thirdTerm}`)
        result.push(`<b>Then add them up: ${this.getCorrectAnswer()}</b>`)
        return result
    }

}