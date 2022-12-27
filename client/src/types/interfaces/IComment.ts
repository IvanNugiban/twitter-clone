import {ITweet} from "./ITweet";


export interface IComment extends ITweet{
    tweetRef: string;
}