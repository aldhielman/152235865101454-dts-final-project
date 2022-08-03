import { Route, Routes } from "react-router-dom";
import { Detail, Home, Login, NotFound404, Register } from "./pages";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/country/:countryId" element={<Detail />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
