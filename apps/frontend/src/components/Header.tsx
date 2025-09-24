import { useContext, useEffect, useState, type JSX } from "react";

import { useNavigate } from "react-router-dom";
import { styled } from "styled-system/jsx";

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
		<SHeader>
			<SLogo>MicroPost</SLogo>
			<SRightItem>
				<SName>{userName}</SName>
				<SLogout onClick={logout}>ログアウト</SLogout>
			</SRightItem>
		</SHeader>
	);
}

const SHeader = styled("header", {
	base: {
		bgColor: "#222",
		display: "flex",
		flexDir: "row",
		color: "#f8f8f8",
		px: "8px",
		h: "full",
	},
});

const SLogo = styled("div", {
	base: {
		py: "8px",
		textAlign: "center",
		justifyContent: "start",
	},
});

const SRightItem = styled("div", {
	base: {
		w: "full",
		display: "flex",
		flexDir: "row",
		justifyContent: "end",
	},
});

const SName = styled("div", {
	base: {
		py: "8px",
		textAlign: "center",
		mr: "8px",
	},
});

const SLogout = styled("div", {
	base: {
		py: "8px",
		textAlign: "center",
	},
});
