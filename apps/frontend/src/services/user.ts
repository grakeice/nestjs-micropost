import axios from "axios";
import { toast } from "sonner";

interface getUserArguments {
	userId: number;
	token: string;
}

interface createUserArguments {
	name: string;
	email: string;
	password: string;
}

interface updateUserInfoArguments {
	userId: number;
	token: string;
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

const host = import.meta.env.VITE_API_HOST;

export async function getUser({ userId, token }: getUserArguments) {
	const base = new URL(`${host}/user/[user_id]`);
	const url = new URL(String(userId), base);
	// url.searchParams.set("token", token);

	const res = await axios.get<User>(url.toString(), {
		headers: { Authorization: `Bearer ${token}` },
	});

	return res.data;
}

export async function createUser({ ...data }: createUserArguments) {
	try {
		const url = new URL(`${host}/user/`);
		const res = await axios.post(url.toString(), data);
		console.log(res.status);
		toast.success("ユーザー登録に成功しました");
	} catch {
		toast.error("ユーザー登録に失敗しました");
	}
}

export async function updateUserInfo({
	userId,
	token,
	...data
}: updateUserInfoArguments) {
	try {
		const base = new URL(`${host}/user/[user_id]`);
		const url = new URL(String(userId), base);
		// url.searchParams.set("token", token);

		const res = await axios.put(url.toString(), data, {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log(res.status);
		toast.success("ユーザー情報の更新に成功しました");
	} catch {
		toast.error("ユーザー情報の更新に失敗しました");
	}
}
