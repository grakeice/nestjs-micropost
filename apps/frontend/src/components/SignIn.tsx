import { useContext, type JSX } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
import { UserContext } from "@/providers/UserProvider";
import { signInApi } from "@/services/auth";

interface SignInFormValues {
	userId: string;
	password: string;
}

export function SignIn(): JSX.Element {
	const navigate = useNavigate();
	const { setUserInfo } = useContext(UserContext);
	const form = useForm<SignInFormValues>({
		defaultValues: {
			userId: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (values: SignInFormValues) => {
		const ret = await signInApi(values.userId, values.password);
		if (ret.token) {
			setUserInfo({ id: ret.user_id, token: ret.token });
			navigate("/main");
		}
	};

	return (
		<div className="mx-auto flex max-w-md flex-col gap-6 rounded-lg bg-white p-8 shadow">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="userId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>ユーザー名</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="ID"
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
	);
}
