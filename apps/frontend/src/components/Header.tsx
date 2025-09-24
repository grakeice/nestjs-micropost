import { useContext, useEffect, useState, type JSX } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "@/providers/UserProvider";
import { getUser } from "@/services/user";

export function Header(): JSX.Element {
	const navigate = useNavigate();

	const { userInfo, setUserInfo } = useContext(UserContext);

	const [userName, setUserName] = useState("");

	const logout = () => {
		setUserInfo({ id: 0, token: "" });
		navigate("/");
	};

	useEffect(() => {
		(async () => {
			const user = await getUser({
				userId: userInfo.id,
				token: userInfo.token,
			});
			setUserName(user.name);
		})();
	});

	return (
		<header>
			<span>MicroPost</span>
			<span>{userName}</span>
			<span onClick={logout}>ログアウト</span>
		</header>
	);
}
