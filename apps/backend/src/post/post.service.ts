import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Equal, MoreThan, type Repository } from "typeorm";

import { Auth } from "@/entities/auth.entity";
import { MicroPost } from "@/entities/microposts.entity";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(MicroPost)
		private microPostsRepository: Repository<MicroPost>,
		@InjectRepository(Auth)
		private authRepository: Repository<Auth>,
	) {}

	async createPost(message: string, token: string) {
		const now = new Date();
		const auth = await this.authRepository.findOne({
			where: {
				token: Equal(token),
				expire_at: MoreThan(now),
			},
		});

		if (!auth) throw new ForbiddenException();

		const record = {
			user_id: auth.user_id,
			content: message,
		};
		return await this.microPostsRepository.save(record);
	}

	async getList(token: string, start: number = 0, nr_records: number = 1) {
		const now = new Date();
		const auth = await this.authRepository.findOne({
			where: {
				token: Equal(token),
				expire_at: MoreThan(now),
			},
		});

		if (!auth) throw new ForbiddenException();

		const qb = this.microPostsRepository
			.createQueryBuilder("micro_post")
			.leftJoinAndSelect("user", "user", "user.id=micro_post.user_id")
			.select([
				"micro_post.id as id",
				"user.name as user_name",
				"micro_post.content as content",
				"micro_post.created_at as created_at",
			])
			.orderBy("micro_post.created_at", "DESC")
			.offset(start)
			.limit(nr_records);

		type ResultType = {
			posts: {
				id: number;
				content: string;
				user_name: string;
				created_at: Date;
			}[];
			length: number;
		};

		const records = await qb.getRawMany<ResultType>();
		const length = await this.microPostsRepository.count();
		console.log(records);
		console.log(length);

		return { posts: records, length };
	}
}
