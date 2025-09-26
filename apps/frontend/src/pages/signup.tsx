import { useForm } from "react-hook-form";

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

interface SignUpFormValues {
	username: string;
	email: string;
	password: string;
}

export default function SignUp() {
	const form = useForm<SignUpFormValues>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = (values: SignUpFormValues) => {
		// サインアップAPI呼び出しなど
		console.log(values);
	};

	return (
		<div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow flex flex-col gap-6">
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
										type="email"
										placeholder="email"
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
										placeholder="パスワード"
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
	);
}
