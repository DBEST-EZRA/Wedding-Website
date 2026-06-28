import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Sections/Home";
import Admin from "./Sections/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/w/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
