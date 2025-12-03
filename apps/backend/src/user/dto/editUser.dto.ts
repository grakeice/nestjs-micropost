import {
	IsEmail,
	IsNotEmpty,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class EditUserDto {
	@IsNotEmpty()
	@IsNumberString()
	id: number;

	@IsOptional()
	@IsString()
	@MinLength(2)
	@MaxLength(50)
	name?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
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
