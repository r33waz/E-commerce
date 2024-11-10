import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/themeContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
    <Toaster position="bottom-right" reverseOrder={false} />
  </Provider>
);
