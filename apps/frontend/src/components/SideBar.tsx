import { useContext, useEffect, useState, type JSX } from "react";

import { Flex } from "@radix-ui/themes";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";
import { createPost } from "@/services/post";
import { getUser } from "@/services/user";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function SideBar(): JSX.Element {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [message, setMessage] = useState("");

	const { userInfo } = useContext(UserContext);
	const { setPostList, setPostListLength } = useContext(PostListContext);

	const getPostList = usePostList(userInfo, setPostList, setPostListLength);

	const handleSendButtonClick = async () => {
		await createPost({
			user_id: String(userInfo.id),
			token: userInfo.token,
			message,
		});
		setMessage("");
		await getPostList();
	};

	useEffect(() => {
		(async () => {
			const user = await getUser({
				userId: userInfo.id,
				token: userInfo.token,
			});
			setUserName(user.name);
			setUserEmail(user.email);
		})();
	});

	return (
		<Flex direction={"column"} p={"4"} asChild>
			<aside>
				<div className="my-1 text-left">{userName}</div>
				<div className="my-1 text-left">{userEmail}</div>
				<div className="my-1 text-left">
					<Textarea
						className={"h-30"}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					></Textarea>
				</div>
				<div className="my-1 text-right">
					<Button type="button" onClick={handleSendButtonClick}>
						送信
					</Button>
				</div>
			</aside>
		</Flex>
	);
}
