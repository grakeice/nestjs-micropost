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
		<header className="bg-gray-900 flex flex-row text-gray-100 px-2 h-full items-center justify-between">
			<div className="py-2 text-xl font-bold tracking-wide">
				MicroPost
			</div>
			<div className="flex flex-row items-center justify-end w-full">
				<div className="py-2 text-center mr-4 text-base">
					{userName}
				</div>
				<button
					onClick={logout}
					className="py-2 text-center px-3 rounded hover:bg-gray-800 transition text-sm font-semibold"
				>
					ログアウト
				</button>
			</div>
		</header>
	);
}
