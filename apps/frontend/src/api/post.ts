import axios from "axios";

type ResultType = {
	id: string;
	content: string;
	user_name: string;
	created_at: string;
};

export async function getList(token: string) {
	const url = new URL("http://127.0.0.1:3000/post");
	url.searchParams.set("token", token);
	url.searchParams.set("records", "10");

	const res = await axios.get<ResultType[]>(url.toString());

	return res.data;
}

interface CreatePostArguments {
	user_id: string;
	token: string;
	message: string;
}

export async function createPost({
	user_id,
	token,
	message,
}: CreatePostArguments) {
	const data = { message };
	const url = new URL("http://127.0.0.1:3000/post");
	url.searchParams.set("user_id", user_id);
	url.searchParams.set("token", token);

	const res = await axios.post(url.toString(), data);
	console.log(res);

	return res;
}
