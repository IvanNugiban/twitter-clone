import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from 'cookie-parser';
import validationPipe from "./globalPipes/ValidationPipe";
import * as express from 'express';
import helmet from "helmet";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    const PORT = process.env.PORT || 5000;
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
    app.use(helmet({ crossOriginResourcePolicy: false,}));
    app.use(express.json({limit: '50mb'}));

    app.useGlobalPipes(validationPipe);

    await app.listen(PORT);
}

bootstrap();
