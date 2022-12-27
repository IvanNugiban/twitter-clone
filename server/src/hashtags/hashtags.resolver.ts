import {Query, Resolver} from '@nestjs/graphql';
import {HashtagModel} from "./entities/hashtag.model";
import {HashtagsService} from "./hashtags.service";

@Resolver()
export class HashtagsResolver {

    constructor(private hashtagService: HashtagsService) {
    }

    @Query(returns => [HashtagModel])
    async getRandomHashtags() {
        return await this.hashtagService.getRandomHashtags();
    }

}
