import { Controller, Get, Query, Res } from "@nestjs/common";

import type { Response } from "express";

import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	async getAuth(
		@Query("email") email: string,
		@Query("password") password: string,
		@Res() res: Response,
	) {
		console.log(`${email} has logged in`);
		const result = await this.authService.getAuth(email, password);
		res.cookie("user_id", result.user_id, { httpOnly: false });
		res.cookie("token", result.token, { httpOnly: false });
		return res.json(result);
	}
}
