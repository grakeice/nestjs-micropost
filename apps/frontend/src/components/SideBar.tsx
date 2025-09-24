import { useContext, useState, type JSX } from "react";

import { styled } from "styled-system/jsx";

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
		<SSideBar>
			<SSideBarRow>hoge</SSideBarRow>
			<SSideBarRow>hode@example.com</SSideBarRow>
			<SSideBarRow>
				<SSideBarTextArea
					name=""
					id=""
					rows={4}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></SSideBarTextArea>
			</SSideBarRow>
			<SSideBarRow>
				<SSideBarButton type="button" onClick={handleSendButtonClick}>
					送信
				</SSideBarButton>
			</SSideBarRow>
		</SSideBar>
	);
}

const SSideBar = styled("aside", {
	base: {
		p: "8px",
	},
});

const SSideBarRow = styled("div", {
	base: {
		mt: "4px",
		mb: "4px",
		textAlign: "left",
	},
});

const SSideBarTextArea = styled("textarea", {
	base: {
		w: "full",
		borderRadius: "4px",
		boxShadow: "inset 0 2px 4px #ccc",
	},
});

const SSideBarButton = styled("button", {
	base: {
		bgColor: "#222",
		p: "4px",
		borderRadius: "8px",
		color: "#fafafa",
		w: "full",
	},
});
