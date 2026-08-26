import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./theme";
import { AppShell } from "./app/AppShell";
import { Home } from "./pages/Home";

// HashRouter avoids relying on server-side route resolution, which the
// Tauri asset protocol does not provide for arbitrary client-side paths.
function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
