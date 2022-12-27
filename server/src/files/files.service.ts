import {HttpException, Injectable} from '@nestjs/common';
import * as uuid from "uuid"
import * as path from "path";
import * as fs from "fs";
import {promisify} from "util";

const existsAsync = promisify(fs.exists);

@Injectable()
export class FilesService {

    private static decodeBase64Image(dataString: string) {
        const matches = dataString.match(/^data:([A-Za-z\d-+\/]+);base64,(.+)$/);
        if (matches?.length !== 3) {
            throw new HttpException('Invalid input string', 400);
        }

        return Buffer.from(matches[2], 'base64');
    }

    async generateImage(image: string) {
        let imageName;
        console.log(image.slice(0, 40));
        if (image.startsWith("data:video/mp4")) imageName = uuid.v4() + ".mp4";
        else if (image.startsWith("data:video/m4v")) imageName = uuid.v4() + ".m4v";
        else imageName = uuid.v4() + ".jpg"
        const filePath = path.resolve(__dirname, '..', "static");

        if (!await existsAsync(filePath)) {
            await fs.promises.mkdir(filePath, {recursive: true})
        }

        const imageBuffer = FilesService.decodeBase64Image(image)

        await fs.promises.writeFile(path.join(filePath, imageName), imageBuffer, "base64");


        return `${process.env.SERVER_URL}/${imageName}`;

    }

    async deleteFile(fileName) {
        const folderPath = path.resolve(__dirname, '..', "static");
        const filePath = path.join(folderPath, fileName)


        if (!await existsAsync(filePath)) return;

        return fs.promises.unlink(filePath);
    }

}
