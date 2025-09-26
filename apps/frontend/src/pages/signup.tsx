import type { JSX } from "react";

export default function SignUp(): JSX.Element {
	return (
		<div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow flex flex-col gap-6">
			<form className="flex flex-col gap-6">
				<div className="flex flex-col gap-1">
					<label
						htmlFor="username"
						className="text-lg font-semibold text-gray-700"
					>
						ユーザー名
					</label>
					<input
						id="username"
						name="username"
						type="text"
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label
						htmlFor="email"
						className="text-lg font-semibold text-gray-700"
					>
						email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label
						htmlFor="password"
						className="text-lg font-semibold text-gray-700"
					>
						パスワード
					</label>
					<input
						id="password"
						name="password"
						type="password"
						className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
					/>
				</div>
				<button
					type="submit"
					className="mt-4 bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-amber-600 transition"
				>
					登録
				</button>
			</form>
		</div>
	);
}
