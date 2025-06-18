import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UserContextProvider } from "./contexts/user-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* requires {Children} */}
    <UserContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserContextProvider>
  </StrictMode>
);
