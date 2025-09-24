import type { JSX } from "react";

import { Layout } from "@/layouts/MainLayout";
import { PostListProvider } from "@/providers/PostListProvider";

export default function Main(): JSX.Element {
	return (
		<PostListProvider>
			<Layout />
		</PostListProvider>
	);
}
