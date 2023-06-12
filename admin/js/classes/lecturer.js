//Class Lecturer information
class Lecturer {
    constructor(name, surname, id, arrTestIDs) {
        this.name = name;
        this.surname = surname;
        this.id = id;

        for (let i = 0; i < arrTestIDs.length; i++) {
            this.arrTestIDs.push(arrTestIDs[i]);
        }
    }

    getName() {
        return this.name;
    }

    getSurname() {
        return this.surname;
    }

    getID() {
        return this.id;
    }

    getArrTestIDs() {
        return this.arrTestIDs;
    }
}