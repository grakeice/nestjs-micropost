import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(
		@Body("name") name: string,
		@Body("email") email: string,
		@Body("password") password: string,
	) {
		await this.userService.createUser({ name, email, password });
	}

	@Get(":id")
	@UseGuards(AuthGuard("jwt"))
	async getUser(@Param("id") id: number) {
		return await this.userService.getUser(id);
	}

	@Put(":id")
	@UseGuards(AuthGuard("jwt"))
	async editUserInfo(
		@Param("id") id: number,
		@Body("name") name: string,
		@Body("email") email: string,
		@Body("password") password: string,
	) {
		await this.userService.updateUserInfo({
			id,
			name,
			email,
			password,
		});
	}
}
