import { useForm } from "react-hook-form";
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
import { AuthLayout } from "@/layouts/AuthLayout";
import { createUser } from "@/services/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
	username: z.string().min(2).max(50),
	email: z.email(),
	password: z.string(),
});

export default function SignUp() {
	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// サインアップAPI呼び出しなど
		await createUser({
			name: values.username,
			email: values.email,
			password: values.password,
		});
		console.log(values);
	};

	return (
		<AuthLayout>
			<div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>ユーザー名</FormLabel>
									<FormControl>
										<Input
											placeholder="ユーザー名"
											// autoComplete={"username"}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>email</FormLabel>
									<FormControl>
										<Input
											// type="email"
											placeholder="email"
											// autoComplete={"email"}
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
											// type="password"
											placeholder="パスワード"
											// autoComplete={"new-password"}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-4 w-full">
							登録
						</Button>
					</form>
				</Form>
			</div>
		</AuthLayout>
	);
}
