//Class Test information
class Test {
    constructor(name, id = 0, arrTestQuestions) {
        this.name = name;
        this.id = id;

        for (let i = 0; i < arrTestQuestions.length; i++) {
            this.arrTestQuestions.push(arrTestQuestions[i]);
        }
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    getArrTestQuestions() {
        return this.arrTestQuestions;
    }
}