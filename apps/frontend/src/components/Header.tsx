import { useContext, useEffect, useState, type JSX } from "react";

import { Container, Flex } from "@radix-ui/themes";
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
		<Container asChild>
			<header>
				<Flex
					direction={"row"}
					m={"2"}
					px={"4"}
					className={"rounded-full border-2 border-gray-100 bg-white"}
				>
					<div className="py-2 text-xl font-bold tracking-wide">
						<Link to={userInfo.token ? "/main" : "/"}>
							MicroPost
						</Link>
					</div>
					<div className="flex w-full flex-row items-center justify-end">
						<div className="mr-4 py-2 text-center text-base">
							{userName}
						</div>
						{userInfo.token ? (
							<Button
								onClick={logout}
								variant={"ghost"}
								className={"cursor-pointer"}
							>
								サインアウト
							</Button>
						) : (
							<Button asChild variant={"ghost"}>
								<Link to="/signup">サインアップ</Link>
							</Button>
						)}
					</div>
				</Flex>
			</header>
		</Container>
	);
}
