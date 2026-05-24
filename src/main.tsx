import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<App />
	</HelmetProvider>,
);
