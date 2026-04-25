import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import "./App.css"; 
import { SelectLanguagePage } from "./pages/selet language/SelectLanguagePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
               
                <Route path="/" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/select-language" element={<SelectLanguagePage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;