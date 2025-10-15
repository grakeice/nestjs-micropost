import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "@/auth/auth.module";
import { Auth } from "@/entities/auth.entity";
import { MicroPost } from "@/entities/microposts.entity";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
	imports: [TypeOrmModule.forFeature([MicroPost, Auth]), AuthModule],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
