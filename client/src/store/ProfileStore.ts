import {makeAutoObservable} from "mobx";


class ProfileStore {
    avatar :  undefined | string  = undefined;
    profileBackground: undefined | string = undefined;
    croppedAvatar: undefined | string;
    croppedProfileBackground: undefined | string;
    isAvatarEditing = false;
    isProfileBackgroundEditing = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAvatar(image : string) {
        this.avatar = image;
        this.isAvatarEditing = true;
    }

    setProfileBackground(image: string) {
        this.profileBackground = image;
        this.isProfileBackgroundEditing = true;
    }


    setCroppedAvatar(image: string) {
        this.croppedAvatar = image;
        this.isAvatarEditing = false;
    }

    setCroppedProfileBackground(image: string) {
        this.croppedProfileBackground = image;
        this.isProfileBackgroundEditing = false;
    }

    stopAvatarEditing() {
        this.avatar = undefined;
        this.isAvatarEditing = false;
    }

    stopProfileBackgroundEditing() {
        this.profileBackground = undefined;
        this.isProfileBackgroundEditing = false;
    }

    reset() {
        this.avatar = undefined;
        this.profileBackground = undefined;
        this.croppedAvatar = undefined;
        this.croppedProfileBackground = undefined;
        this.isAvatarEditing = false;
        this.isProfileBackgroundEditing = false;
    }
}

export default new ProfileStore();