import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Auth {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column({ name: "user_id" })
	userId: number;

	@Column("varchar")
	token: string;

	@Column({ name: "expire_at" })
	expireAt: Date;

	@CreateDateColumn({ name: "created_at" })
	readonly createdAt?: Date;

	@UpdateDateColumn({ name: "updated_at" })
	readonly updatedAt?: Date;
}
