import axios from "axios";

type ResultType = {
	id: number;
	content: string;
	user_name: string;
	created_at: Date;
};

export async function getList(token: string) {
	const url = new URL("http://127.0.0.1:3000/post");
	url.searchParams.set("token", token);
	url.searchParams.set("records", "10");

	const res = await axios.get<ResultType>(url.toString());

	return res.data;
}
