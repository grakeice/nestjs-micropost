import type { ComponentProps, JSX } from "react";

import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

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
		<SPost {..._props}>
			<div>
				<SName>{post.userName}</SName>
				<SDate>{formatDate(post.createdAt)}</SDate>
			</div>
			<div
				className={css({
					whiteSpace: "pre-wrap",
				})}
			>
				{post.content}
			</div>
		</SPost>
	);
}

const SPost = styled("div", {
	base: {
		m: "8px 0",
		borderBottom: "1px solid #aaa",
		textAlign: "left",
		pl: "8px",
	},
});

const SName = styled("span", {
	base: {
		fontSize: "sm",
		color: "#000044",
	},
});

const SDate = styled("span", {
	base: {
		ml: "8px",
		fontSize: "sm",
		color: "#000044",
	},
});
