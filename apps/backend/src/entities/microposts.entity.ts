import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class MicroPost {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ name: "user_id" })
	userId: number;

	@Column()
	content: string;

	@CreateDateColumn({ name: "created_at" })
	readonly createdAt?: Date;

	@UpdateDateColumn({ name: "updated_at" })
	readonly updatedAt?: Date;
}
