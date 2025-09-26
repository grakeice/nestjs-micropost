import { StrictMode } from "react";

import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Theme>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Theme>
	</StrictMode>,
);
