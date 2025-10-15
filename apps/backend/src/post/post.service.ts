import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { type Repository } from "typeorm";

import { MicroPost } from "@/entities/microposts.entity";

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(MicroPost)
		private microPostsRepository: Repository<MicroPost>,
	) {}

	async createPost(userId: number, message: string) {
		const record = {
			user_id: userId,
			content: message,
		};
		return await this.microPostsRepository.save(record);
	}

	async getList(start: number = 0, nr_records: number = 1, query?: string) {
		const qb = this.microPostsRepository
			.createQueryBuilder("micro_post")
			.leftJoinAndSelect("user", "user", "user.id=micro_post.user_id")
			.select([
				"micro_post.id as id",
				"user.name as user_name",
				"user.id as user_id",
				"micro_post.content as content",
				"micro_post.created_at as created_at",
			])
			.orderBy("micro_post.created_at", "DESC");

		if (query) {
			qb.andWhere("micro_post.content LIKE :query", {
				query: `%${query}%`,
			});
		}

		const length = await qb.getCount();

		qb.offset(start)
			.limit(nr_records)
			.orderBy("micro_post.created_at", "DESC");

		type ResultType = {
			posts: {
				id: number;
				content: string;
				user_id: number;
				user_name: string;
				created_at: Date;
			}[];
			length: number;
		};

		const records = await qb.getRawMany<ResultType>();

		return { posts: records, length };
	}

	async deletePost(messageId: number) {
		await this.microPostsRepository.delete(messageId);
	}
}
