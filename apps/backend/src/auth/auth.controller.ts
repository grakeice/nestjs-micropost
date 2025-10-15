import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import type { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post()
	async getAuth(@Body() authDto: AuthDto) {
		return await this.authService.getAuth(authDto);
	}
}
