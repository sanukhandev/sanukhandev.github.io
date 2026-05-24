import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/anta/400.css";
import "@fontsource/raleway/latin-400.css";
import "@fontsource/raleway/latin-500.css";
import "@fontsource/raleway/latin-600.css";
import "@fontsource/raleway/latin-700.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<App />
	</HelmetProvider>,
);
