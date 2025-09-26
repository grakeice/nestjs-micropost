import { useContext, useEffect, useState, type JSX } from "react";

import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "@/providers/UserProvider";
import { getUser } from "@/services/user";

import { Button } from "./ui/button";

export function Header(): JSX.Element {
	const navigate = useNavigate();

	const { userInfo, setUserInfo } = useContext(UserContext);

	const [userName, setUserName] = useState("");

	const logout = () => {
		setUserInfo({ id: 0, token: "" });
		navigate("/");
	};

	useEffect(() => {
		if (userName)
			(async () => {
				const user = await getUser({
					userId: userInfo.id,
					token: userInfo.token,
				});
				setUserName(user.name);
			})();
	}, [userInfo.id, userInfo.token, userName]);

	return (
		<header className="flex h-10 w-dvw flex-row items-center justify-between bg-gray-900 px-2 text-gray-100">
			<div className="py-2 text-xl font-bold tracking-wide">
				<Link to={userInfo.token ? "/main" : "/"}>MicroPost</Link>
			</div>
			<div className="flex w-full flex-row items-center justify-end">
				<div className="mr-4 py-2 text-center text-base">
					{userName}
				</div>
				{userInfo.token ? (
					<Button onClick={logout}>サインアウト</Button>
				) : (
					<Button asChild>
						<Link to="/signup">サインアップ</Link>
					</Button>
				)}
			</div>
		</header>
	);
}
