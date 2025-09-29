import axios from "axios";

interface getUserArguments {
	userId: number;
	token: string;
}

interface createUserArguments {
	name: string;
	email: string;
	password: string;
}

export interface User {
	readonly id: number;
	name: string;
	hash: string;
	email: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
}

export async function getUser({ userId, token }: getUserArguments) {
	const base = new URL("http://127.0.0.1:3000/user/[user_id]");
	const url = new URL(String(userId), base);
	url.searchParams.set("token", token);

	const res = await axios.get<User>(url.toString());

	return res.data;
}

export async function createUser({ ...data }: createUserArguments) {
	const url = new URL("http://127.0.0.1:3000/user/");
	const res = await axios.post(url.toString(), data);
	console.log(res.status);
}
