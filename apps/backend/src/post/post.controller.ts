import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { PostService } from "./post.service";

@Controller("post")
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	@UseGuards(AuthGuard("jwt"))
	async createPost(
		@Body("user_id") userId: number,
		@Body("message") message: string,
	) {
		console.log(userId, message);
		return await this.postService.createPost(userId, message);
	}

	@Get()
	@UseGuards(AuthGuard("jwt"))
	async getList(
		@Query("start") start: number,
		@Query("records") records: number,
		@Query("q") query?: string,
	) {
		return await this.postService.getList(start, records, query);
	}

	@Delete(":id")
	@UseGuards(AuthGuard("jwt"))
	async deletePost(@Param("id") id: number) {
		await this.postService.deletePost(id);
	}
}
