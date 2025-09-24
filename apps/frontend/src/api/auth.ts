import axios from "axios";

export async function signInApi(userId: string, password: string) {
	const url = new URL("http://127.0.0.1:3000/auth");
	url.searchParams.set("user_id", userId);
	url.searchParams.set("password", password);
	const res = await axios.get<{ token: string; user_id: number }>(
		url.toString(),
	);
	console.log(res);
	return res.data;
}
