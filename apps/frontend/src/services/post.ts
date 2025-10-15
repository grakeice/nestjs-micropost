import axios from "axios";
import { toast } from "sonner";

type ResultType = {
	posts: {
		id: string;
		content: string;
		user_id: string;
		user_name: string;
		created_at: string;
	}[];
	length: number;
};

const host = import.meta.env.VITE_API_HOST;

export async function getList(
	token: string,
	start: number = 1,
	query?: string,
) {
	const url = new URL(`${host}/post`);
	// url.searchParams.set("token", token);
	url.searchParams.set("start", start.toString());
	url.searchParams.set("records", "10");
	if (query) url.searchParams.set("q", query);

	const res = await axios.get<ResultType>(url.toString(), {
		headers: { Authorization: `Bearer ${token}` },
	});

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
	const url = new URL(`${host}/post`);
	url.searchParams.set("user_id", user_id);

	const res = await axios.post(url.toString(), data, {
		headers: { Authorization: `Bearer ${token}` },
	});
	console.log(res);

	return res;
}

interface DeletePostArguments {
	token: string;
	messageId: number;
}

export async function deletePost({ token, messageId }: DeletePostArguments) {
	const base = new URL(`${host}/post/[messageId]`);
	const url = new URL(String(messageId), base);

	try {
		const res = await axios.delete(url.toString(), {
			headers: { Authorization: `Bearer ${token}` },
		});
		console.log(res);
		toast("ポストを削除しました");
		return res;
	} catch {
		toast.error("ポストの削除中に問題が発生しました");
	}
}
