import {
	useContext,
	useEffect,
	useEffectEvent,
	useState,
	type JSX,
} from "react";

import { Container, Flex } from "@radix-ui/themes";
import { ChevronRight, User } from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { UserContext } from "@/providers/UserProvider";
import { getUser } from "@/services/user";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header(): JSX.Element {
	const navigate = useNavigate();

	const { userInfo, setUserInfo } = useContext(UserContext);

	const [userName, setUserName] = useState("");
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	const logout = () => {
		setUserInfo({ id: 0, token: "" });
		document.cookie = "user_id=0";
		document.cookie = "token=";
		navigate("/");
		toast("サインアウトしました");
	};

	const fetchUserName = useEffectEvent(async () => {
		const user = await getUser({
			userId: userInfo.id,
			token: userInfo.token,
		});
		setUserName(user?.name ?? "");
	});

	useEffect(() => {
		fetchUserName();
	});

	return (
		<Container asChild className={"h-[4rem]"}>
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
						{userInfo.token ? (
							<Popover
								open={isPopoverOpen}
								onOpenChange={setIsPopoverOpen}
							>
								<PopoverTrigger
									className={"cursor-pointer"}
									asChild
								>
									<Button variant={"ghost"}>
										<Avatar>
											<AvatarImage />
											<AvatarFallback>
												{userName !== "" ? (
													userName
												) : (
													<User />
												)}
											</AvatarFallback>
										</Avatar>
										<motion.div
											animate={
												isPopoverOpen
													? {
															transform:
																"rotate(90deg)",
														}
													: {
															transform:
																"rotate(0deg)",
														}
											}
											transition={{ duration: 0.1 }}
										>
											<ChevronRight />
										</motion.div>
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className={
										"flex w-fit flex-col p-1 [&>*]:w-full [&>*]:justify-start"
									}
								>
									<Button
										className={"cursor-pointer"}
										variant={"ghost"}
										asChild
									>
										<Link to="/user">
											ユーザー情報の編集
										</Link>
									</Button>
									<Button
										className={"cursor-pointer"}
										variant={"ghost"}
										onClick={logout}
									>
										サインアウト
									</Button>
								</PopoverContent>
							</Popover>
						) : (
							<Button
								className={"cursor-pointer"}
								variant={"ghost"}
								asChild
							>
								<Link to="/signup">サインアップ</Link>
							</Button>
						)}
					</div>
				</Flex>
			</header>
		</Container>
	);
}
