import {makeAutoObservable} from "mobx";


class AnotherUserStore {
    anotherUserPseudonym: string | undefined = undefined;
    anotherUserUsername: string | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setAnotherUser(pseudonym: string, username: string) {
        this.anotherUserPseudonym = pseudonym;
        this.anotherUserUsername = username;
    }

}

export default new AnotherUserStore();