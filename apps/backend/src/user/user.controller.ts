import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";

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
	async getUser(@Param("id") id: number, @Query("token") token: string) {
		return await this.userService.getUser(token, id);
	}

	@Put(":id")
	async editUserInfo(
		@Param("id") id: number,
		@Query("token") token: string,
		@Body("name") name: string,
		@Body("email") email: string,
		@Body("password") password: string,
	) {
		await this.userService.updateUserInfo({
			id,
			token,
			name,
			email,
			password,
		});
	}
}
