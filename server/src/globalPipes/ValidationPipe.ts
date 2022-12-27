import {BadRequestException, ValidationError} from "@nestjs/common";
import {ValidationPipe} from "@nestjs/common";

const validationPipe = new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(Object.values(errors[0].constraints).toString());
    },
    forbidUnknownValues: false,
})

export default validationPipe;