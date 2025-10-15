import {
	IsNotEmpty,
	IsNumberString,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class EditUserDto {
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
		id,
		name,
		email,
		password,
	}: {
		id: number;
		name?: string;
		email?: string;
		password?: string;
	}) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
