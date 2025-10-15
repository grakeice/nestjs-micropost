import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import type { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	async getAuth(@Body() authDto: AuthDto) {
		// const result = await this.authService.getAuth(email, password);
		// res.cookie("user_id", result.user_id, { httpOnly: false });
		// res.cookie("token", result.token, { httpOnly: false });
		// return res.json(result);
		return await this.authService.getAuth(authDto);
	}
}
