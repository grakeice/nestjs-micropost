import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { createHash } from "node:crypto";

import { validate } from "class-validator";
import { Equal, MoreThan, type Repository } from "typeorm";

import { Auth } from "@/entities/auth.entity";
import { User } from "@/entities/user.entity";

import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Auth)
		private authRepository: Repository<Auth>,
	) {}

	async getUser(token: string, id: number) {
		const now = new Date();
		const auth = await this.authRepository.findOne({
			where: {
				token: Equal(token),
				expire_at: MoreThan(now),
			},
		});

		if (!auth) throw new ForbiddenException();

		const user = await this.userRepository.findOne({
			where: {
				id: Equal(id),
			},
		});

		if (!user) throw new NotFoundException();

		return user;
	}

	async createUser({ name, email, password }: CreateUserDto) {
		const hash = createHash("md5").update(password).digest("hex");
		const record = new CreateUserDto({ name, email, password });
		const errors = await validate(record);
		if (errors.length > 0) {
			throw new BadRequestException(errors);
		} else {
			await this.userRepository.save({ name, email, hash });
		}
	}
}
