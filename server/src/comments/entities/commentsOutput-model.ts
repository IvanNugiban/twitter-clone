import {Field, ObjectType} from "@nestjs/graphql";
import {CommentsModel} from "./comments.model";


@ObjectType("CommentsOutput")
export class CommentsOutputModel {
    @Field(type => [CommentsModel], {description: "Comments"})
    comments: CommentsModel[]
    @Field({description: "Has tweet more comments?"})
    hasMore : boolean;
}