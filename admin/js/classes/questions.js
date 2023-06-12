//Class Test information
class Questions {
    constructor(question, arrOptions, answer, mark, id = 0) {
        this.question = question;
        this.id = id;
        this.ans = answer;
        this.mark = mark;
        this.arrOptions = [];
        for (let i = 0; i < arrOptions.length; i++) {
            this.arrOptions.push(arrOptions[i]);
        }
    }

    getQuestion() {
        return this.question;
    }

    getID() {
        return this.id;
    }

    getAnswer() {
        return this.ans;
    }

    getArrOptions() {
        return this.arrOptions;
    }
}