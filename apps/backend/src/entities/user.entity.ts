import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	Unique,
	UpdateDateColumn,
} from "typeorm";

@Entity()
@Unique(["email"])
export class User {
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Column("varchar", { nullable: false })
	name: string;

	@Column("varchar", { nullable: false })
	hash: string;

	@Column("varchar", { nullable: false })
	email: string;

	@CreateDateColumn({ name: "created_at" })
	readonly createdAt?: Date;

	@UpdateDateColumn({ name: "updated_at" })
	readonly updatedAt?: Date;
}
