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
		<div {..._props} className={"mb-3 border-gray-300 pl-2 text-left"}>
			<div>
				<span className="text-sm font-semibold text-blue-900">
					{post.userName}
				</span>
				<span className="ml-2 text-sm text-blue-900">
					{formatDate(post.createdAt)}
				</span>
			</div>
			<div className="text-base whitespace-pre-wrap text-gray-800">
				{post.content}
			</div>
		</div>
	);
}
