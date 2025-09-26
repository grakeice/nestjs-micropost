import type { ComponentProps, JSX } from "react";

import type { Post } from "@/providers/PostListProvider";

interface PostProps extends ComponentProps<"div"> {
	post: Post;
}

export function Post({ ...props }: PostProps): JSX.Element {
	const { post, ..._props } = props;

	const formatDate = (dateObj: Date) => {
		const dateOption = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		} satisfies Intl.DateTimeFormatOptions;

		return dateObj.toLocaleDateString("ja", dateOption);
	};

	return (
		<div
			{..._props}
			className="my-2 border-b border-gray-300 text-left pl-2 pb-2"
		>
			<div>
				<span className="text-sm text-blue-900 font-semibold">
					{post.userName}
				</span>
				<span className="ml-2 text-sm text-blue-900">
					{formatDate(post.createdAt)}
				</span>
			</div>
			<div className="whitespace-pre-wrap mt-1 text-base text-gray-800">
				{post.content}
			</div>
		</div>
	);
}
