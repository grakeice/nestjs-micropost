import {
	useContext,
	useEffect,
	useState,
	type Dispatch,
	type JSX,
	type SetStateAction,
} from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Flex } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { usePostList } from "@/hooks/usePostList";
import { PostListContext } from "@/providers/PostListProvider";
import { UserContext } from "@/providers/UserProvider";
import { createPost } from "@/services/post";
import { getUser } from "@/services/user";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
	message: z.string().trim().min(1, { error: "内容を入力してください" }),
});

interface SideBarProps {
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
}

export function SideBar({ ...props }: SideBarProps): JSX.Element {
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const { userInfo } = useContext(UserContext);
	const { setPostList, setPostListLength } = useContext(PostListContext);

	const { getPostList } = usePostList(
		userInfo,
		setPostList,
		setPostListLength,
	);

	const { setPage } = props;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await createPost({
			user_id: String(userInfo.id),
			token: userInfo.token,
			message: values.message,
		});
		form.setValue("message", "");
		setPage(1);
		await getPostList();
	};

	useEffect(() => {
		(async () => {
			const user = await getUser({
				userId: userInfo.id,
				token: userInfo.token,
			});
			setUserName(user?.name ?? "");
			setUserEmail(user?.email ?? "");
		})();
	}, [userInfo.id, userInfo.token]);

	return (
		<Flex direction={"column"} p={"4"} asChild>
			<aside>
				<div className="my-1 text-left">{userName}</div>
				<div className="my-1 text-left">{userEmail}</div>
				<div className="my-1 text-left">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name={"message"}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												className={"h-30"}
												{...field}
											></Textarea>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="my-1 text-right">
								<Button type="submit">送信</Button>
							</div>
						</form>
					</Form>
				</div>
			</aside>
		</Flex>
	);
}
