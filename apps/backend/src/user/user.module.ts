import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@/auth/auth.module";
import { Auth } from "@/entities/auth.entity";
import { User } from "@/entities/user.entity";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, Auth]), AuthModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
