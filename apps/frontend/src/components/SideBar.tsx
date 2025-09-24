import { useContext, useState, type JSX } from "react";

import { createPost } from "@/api/post";
import { UserContext } from "@/providers/UserProvider";

export function SideBar(): JSX.Element {
	const [message, setMessage] = useState("");

	const { userInfo } = useContext(UserContext);

	const handleSendButtonClick = () => {
		createPost({
			user_id: String(userInfo.id),
			token: userInfo.token,
			message,
		});
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
