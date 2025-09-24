import type { ComponentProps, JSX } from "react";

import { css } from "styled-system/css";

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
		<div {..._props}>
			<div>{formatDate(post.createdAt)}</div>
			<div>{post.userName}</div>
			<div
				className={css({
					whiteSpace: "pre-wrap",
				})}
			>
				{post.content}
			</div>
		</div>
	);
}
