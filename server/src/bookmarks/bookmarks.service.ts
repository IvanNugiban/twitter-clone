import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BookmarkModel} from "./entities/bookmark.model";

@Injectable()
export class BookmarksService {

    constructor(@InjectModel("Bookmark") private bookmarkSchema: Model<BookmarkModel>) {
    }

    async addBookmark(tweetId: string, userId: string) {
        const possibleBookmark = await this.bookmarkSchema.findOne({tweetRef: tweetId, userRef: userId});
        if (possibleBookmark) {
            return this.bookmarkSchema.findOneAndDelete({tweetRef: tweetId, userRef: userId})
        }
        return this.bookmarkSchema.create({tweetRef: tweetId, userRef: userId});
    }

    async getAllBookmarks(userId: string) {
        return this.bookmarkSchema.find({userRef: userId})
    }

    async isTweetBookmarked(tweetId: string, userId: string) {
        const allBookmarks = await this.bookmarkSchema.find({tweetRef: tweetId});
        return allBookmarks.find((item) => item.userRef === userId);
    }

    async clearAllBookmarks(userId: string) {
        return this.bookmarkSchema.find({userRef: userId}).deleteMany()
    }

}
