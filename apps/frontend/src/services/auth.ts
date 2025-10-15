import axios from "axios";
import { toast } from "sonner";

const host = import.meta.env.VITE_API_HOST;

export async function signInApi(email: string, password: string) {
	const url = new URL(`${host}/auth`);

	try {
		const res = await axios.post<{ token: string; user_id: number }>(
			url.toString(),
			{ email, password },
		);

		const { user_id, token } = res.data;

		const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
		document.cookie = `user_id=${user_id}; expires=${expires}; path=/`;
		document.cookie = `token=${token}; expires=${expires}; path=/`;

		console.log(res);
		toast.success("ログインに成功しました");
		return res.data;
	} catch {
		toast.error("ログインに失敗しました");
	}
}
