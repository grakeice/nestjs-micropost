import {
	IsNotEmpty,
	IsNumberString,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class EditUserDto {
	@IsNotEmpty()
	token: string;

	@IsNotEmpty()
	@IsNumberString()
	id: number;

	@IsString()
	@MinLength(2)
	@MaxLength(50)
	name?: string;

	@IsString()
	email?: string;

	@IsString()
	password?: string;

	constructor({
		token,
		id,
		name,
		email,
		password,
	}: {
		token: string;
		id: number;
		name?: string;
		email?: string;
		password?: string;
	}) {
		this.token = token;
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
