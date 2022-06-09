import { React, } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import DevelopersPage from "./components/Developers";
import NotFound from "./components/NotFound";
import { ErrorBoundary } from "react-error-boundary";
function App() {
  

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/archive" element={<DevelopersPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;