import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/login/LoginPage";
import { RegisterPage } from "./pages/register/RegisterPage";
import "./App.css"; // Можно оставить или создать новый для глобальных стилей

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Главная страница теперь — Логин */}
                <Route path="/" element={<LoginPage />} />

                {/* Страница регистрации */}
                <Route path="/register" element={<RegisterPage />} />

                {/* Если пользователь ввел любой другой путь — отправляем на логин */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;