import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { Equal, type Repository } from "typeorm";

import { Auth } from "@/entities/auth.entity";
import { User } from "@/entities/user.entity";

import { CreateUserDto } from "./dto/createUser.dto";
import { EditUserDto } from "./dto/editUser.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(Auth)
		private authRepository: Repository<Auth>,
	) {}

	/**
	 * ユーザー情報を取得する
	 * @param id ユーザーID
	 * @returns ユーザー情報
	 */
	async getUser(id: number) {
		// const now = new Date();
		// const auth = await this.authRepository.findOne({
		// 	where: {
		// 		token: Equal(token),
		// 		expire_at: MoreThan(now),
		// 	},
		// });

		// if (!auth) throw new ForbiddenException();

		const user = await this.userRepository.findOne({
			where: {
				id: Equal(id),
			},
		});

		if (!user) throw new NotFoundException();

		return user;
	}

	/**
	 * ユーザー登録をする
	 * @param param0 ユーザー情報
	 */
	async createUser({ name, email, password }: CreateUserDto) {
		// const hash = createHash("md5").update(password).digest("hex");
		const hash = await bcrypt.hash(password, 10);
		const record = new CreateUserDto({ name, email, password });
		const errors = await validate(record);
		if (errors.length > 0) {
			throw new BadRequestException(errors);
		} else {
			await this.userRepository.save({ name, email, hash });
		}
	}

	/**
	 * ユーザー情報を更新する
	 * @param param0 ユーザー情報
	 */
	async updateUserInfo({ id, name, email, password }: EditUserDto) {
		// const now = new Date();
		// const auth = await this.authRepository.findOne({
		// 	where: {
		// 		token: Equal(token),
		// 		expire_at: MoreThan(now),
		// 	},
		// });

		// if (!auth) throw new ForbiddenException();

		const user = await this.userRepository.findOne({
			where: {
				id: Equal(id),
			},
		});

		if (!user) throw new NotFoundException();

		const record = new EditUserDto({ id, name, email, password });

		const errors = await validate(record);
		if (errors.length > 0) {
			throw new BadRequestException(errors);
		} else {
			await this.userRepository.update(
				{ id },
				{
					name,
					email,
					// パスワード更新があればパスワードをハッシュ化してからリポジトリに格納
					hash: password
						? await bcrypt.hash(password, 10)
						: undefined,
				},
			);
		}
	}
}
