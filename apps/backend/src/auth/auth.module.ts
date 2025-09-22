import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Auth } from "@/entities/auth.entity";
import { User } from "@/entities/user.entity";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	imports: [TypeOrmModule.forFeature([Auth, User])],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
