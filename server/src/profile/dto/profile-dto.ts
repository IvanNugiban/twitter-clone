import {ProfileModel} from "../entities/profile.model";


class ProfileDto{

    username: string;
    description?: string;
    website?: string;
    birthday?: string;
    avatar?: string;
    profileBackground?: string;

    constructor(model: ProfileModel) {
        this.username = model.username;
        this.description = model.description;
        this.website = model.website;
        this.birthday = model.birthday;
        this.avatar = model.avatar
        this.profileBackground = model.profileBackground;
    }

}

export default ProfileDto;