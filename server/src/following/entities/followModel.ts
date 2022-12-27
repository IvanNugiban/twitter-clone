import {Field, InputType} from "@nestjs/graphql";

@InputType({description: 'Follow and unfollow data'})
export class FollowModel {
    @Field({description: "Pseudonym"})
    pseudonym: string
    @Field({description: "Is user following"})
    isUserFollowing: boolean
}
