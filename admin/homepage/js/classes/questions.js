//Class Test information
class Questions {
    constructor(question, arrOptions, answer, mark, file = null, fileType = '') {
        this.question = question;
        this.file = file;
        this.ans = answer;
        this.mark = mark;
        this.arrOptions = [];
        this.fileType = fileType;
        for (let i = 0; i < arrOptions.length; i++) {
            this.arrOptions.push(arrOptions[i]);
        }
    }
    getFileType() {
        return this.fileType;
    }
    getFile() {
        return this.file;
    }
    getQuestion() {
        return this.question;
    }

    getAnswer() {
        return this.ans;
    }

    getArrOptions() {
        return this.arrOptions;
    }
}