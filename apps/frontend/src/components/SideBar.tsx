import { useContext, useState, type JSX } from "react";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";
import { createPost } from "@/services/post";

export function SideBar(): JSX.Element {
	const [message, setMessage] = useState("");

	const { userInfo } = useContext(UserContext);
	const { setPostList } = useContext(PostListContext);

	const getPostList = usePostList(userInfo, setPostList);

	const handleSendButtonClick = async () => {
		await createPost({
			user_id: String(userInfo.id),
			token: userInfo.token,
			message,
		});
		await getPostList();
	};

	return (
		<aside className="p-2 w-full max-w-xs bg-white rounded shadow">
			<div className="my-1 text-left">hoge</div>
			<div className="my-1 text-left">hode@example.com</div>
			<div className="my-1 text-left">
				<textarea
					rows={4}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="w-full rounded shadow-inner border border-gray-300 p-2 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
				></textarea>
			</div>
			<div className="my-1 text-left">
				<button
					type="button"
					onClick={handleSendButtonClick}
					className="w-full bg-gray-900 text-gray-100 p-2 rounded-lg hover:bg-gray-800 transition"
				>
					送信
				</button>
			</div>
		</aside>
	);
}
