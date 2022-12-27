import {Injectable} from '@nestjs/common';
import * as nodemailer from "nodemailer";
import {Transporter} from "nodemailer";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IVerification} from "../auth/interfaces/IVerification";

@Injectable()
export class EmailService {
    private transporter: Transporter

    constructor(@InjectModel("Verification") private verificationSchema: Model<IVerification>) {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: Number(process.env.NODEMAILER_PORT),
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })
    }


    async saveAndSendVerificationCode(email: string) {
        const verificationCode = EmailService.generateVerificationCode();
        await this.verificationSchema.create({
            code: verificationCode,
            forEmail: email,
            expiresIn: Date.now() + 300000
        })

        await this.sendValidationEmail(email, verificationCode);
        return email;
    }

    private async sendValidationEmail(email: string, verificationCode: number) {
        return this.transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: "Verify email",
            html: `
        <h2>Hello! Please, verify your email using this code</h2>
        <p>Your verification code is: ${verificationCode}</p>
        `
        })
    }


    private static generateVerificationCode(): number {
        return Math.floor(100000 + Math.random() * 900000)
    }

}
