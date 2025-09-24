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
		<div>
			<div>hoge</div>
			<div>hode@example.com</div>
			<div>
				<textarea
					name=""
					id=""
					rows={4}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></textarea>
			</div>
			<div>
				<button type="button" onClick={handleSendButtonClick}>
					送信
				</button>
			</div>
		</div>
	);
}
