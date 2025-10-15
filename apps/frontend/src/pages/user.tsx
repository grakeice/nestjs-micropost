import { useContext, useEffect, type JSX } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Layout } from "@/layouts/MainLayout";
import { UserContext } from "@/providers/UserProvider";
import { getUser, updateUserInfo } from "@/services/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.email(),
	password: z.string(),
});

export default function UserPage(): JSX.Element {
	const navigate = useNavigate();

	const { userInfo } = useContext(UserContext);

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await updateUserInfo({
			userId: userInfo.id,
			token: userInfo.token,
			...values,
		});

		navigate("/main");
	};

	useEffect(() => {
		(async () => {
			const userData = await getUser({
				userId: userInfo.id,
				token: userInfo.token,
			});
			form.setValue("name", userData?.name ?? "");
			form.setValue("email", userData?.email ?? "");
		})();
	});

	return (
		<Layout>
			<div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						<FormField
							control={form.control}
							name={"name"}
							render={({ field }) => (
								<FormItem>
									<FormLabel>ユーザー名</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={"email"}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={"password"}
							render={({ field }) => (
								<FormItem>
									<FormLabel>パスワード</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<Button type={"submit"}>更新</Button>
					</form>
				</Form>
			</div>
		</Layout>
	);
}
