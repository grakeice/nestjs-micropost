import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(2)
	@MaxLength(50)
	name: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	constructor({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
