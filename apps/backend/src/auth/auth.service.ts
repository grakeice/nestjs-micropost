import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { createHash } from "node:crypto";

import { Equal, type Repository } from "typeorm";

import { Auth } from "@/entities/auth.entity";
import { User } from "@/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Auth)
		private authRepository: Repository<Auth>,
	) {}

	async getAuth(name: string, password: string) {
		if (!password) {
			throw new UnauthorizedException();
		}

		const hash = createHash("md5").update(password).digest("hex");
		const user = await this.userRepository.findOne({
			where: {
				name: Equal(name),
				hash: Equal(hash),
			},
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const ret = {
			token: "",
			user_id: user.id,
		};

		const expire = new Date();
		expire.setDate(expire.getDate() + 1);

		const auth = await this.authRepository.findOne({
			where: {
				user_id: Equal(user.id),
			},
		});

		if (auth) {
			auth.expire_at = expire;
			await this.authRepository.save(auth);
			ret.token = auth.token;
		} else {
			const token = crypto.randomUUID();
			const record = {
				user_id: user.id,
				token: token,
				expire_at: expire.toISOString(),
			};
			await this.authRepository.save(record);
			ret.token = token;
		}

		return ret;
	}
}
