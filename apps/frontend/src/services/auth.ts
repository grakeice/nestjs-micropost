import axios from "axios";

export async function signInApi(userId: string, password: string) {
	const url = new URL("http://127.0.0.1:3000/auth");
	url.searchParams.set("user_id", userId);
	url.searchParams.set("password", password);
	const res = await axios.get<{ token: string; user_id: number }>(
		url.toString(),
	);

	const { user_id, token } = res.data;

	const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
	document.cookie = `user_id=${user_id}; expires=${expires}; path=/`;
	document.cookie = `token=${token}; expires=${expires}; path=/`;

	console.log(res);
	return res.data;
}
