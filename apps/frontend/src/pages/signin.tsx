import { useContext, type JSX } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Layout } from "@/layouts/MainLayout";
import { UserContext } from "@/providers/UserProvider";
import { signInApi } from "@/services/auth";

const formSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export default function SignInPage(): JSX.Element {
	const navigate = useNavigate();
	const { setUserInfo } = useContext(UserContext);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const ret = await signInApi(values.email, values.password);
		if (ret?.token) {
			setUserInfo({ id: ret.user_id, token: ret.token });
			navigate("/main");
		}
	};

	return (
		<Layout>
			<div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>パスワード</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">ログイン</Button>
					</form>
				</Form>
			</div>
		</Layout>
	);
}
