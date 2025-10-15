import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import * as bcrypt from "bcrypt";
import { Equal, type Repository } from "typeorm";

import { User } from "@/entities/user.entity";
import type { JwtPayload } from "@/types/jwtPayload";

import type { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwtService: JwtService,
	) {}
	async getAuth(
		authDto: AuthDto,
	): Promise<{ token: string; user_id: number }> {
		const { email, password } = authDto;
		const user = await this.userRepository.findOne({
			where: { email: Equal(email) },
		});

		if (user && (await bcrypt.compare(password, user.hash))) {
			const payload: JwtPayload = {
				sub: user.email,
				username: user.name,
			};
			const token = this.jwtService.sign(payload);
			return { token, user_id: user.id };
		}

		throw new UnauthorizedException();
	}
}
