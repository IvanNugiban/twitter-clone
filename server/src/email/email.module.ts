import {Module} from '@nestjs/common';
import {EmailService} from './email.service';
import {MongooseModule} from "@nestjs/mongoose";
import Verification from "../auth/schemas/verification.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: "Verification", schema: Verification}])],
  providers: [EmailService]
})
export class EmailModule {}
