import { useContext, type JSX } from "react";

import { useNavigate } from "react-router-dom";

import { UserContext } from "@/providers/UserProvider";

export function Header(): JSX.Element {
	const navigate = useNavigate();
	const { setUserInfo } = useContext(UserContext);
	const logout = () => {
		setUserInfo({ id: 0, token: "" });
		navigate("/");
	};
	return (
		<div>
			<span>MicroPost</span>
			<span>UserName</span>
			<span onClick={logout}>ログアウト</span>
		</div>
	);
}
