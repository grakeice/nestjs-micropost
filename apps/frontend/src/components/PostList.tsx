import type { JSX } from "react";

import { Post } from "./Post";

export function PostList(): JSX.Element {
	return (
		<div>
			<p>PostList</p>
			<Post />
		</div>
	);
}
