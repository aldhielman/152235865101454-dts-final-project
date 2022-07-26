import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { Home, Detail, Register, Login, NotFound404 } from "./pages";

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:countryId" element={<Detail />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
