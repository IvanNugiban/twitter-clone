import {Schema} from "mongoose";
import {IToken} from "./interfaces/TokenInterfaces";

const Token = new Schema<IToken>({
    userId: String,
    refreshToken: String
})

export default Token;