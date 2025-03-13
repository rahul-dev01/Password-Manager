import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "./Component/NavBar";
import Manager from "./Component/Manager";
import LoginRegister from "./pages/Login";
import Footer from "./Component/Footer";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user"); 
                setUser(null);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const ProtectedRoute = ({ children }) => {
        return user ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <NavBar user={user} onLogout={handleLogout} />
                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<LoginRegister setUser={setUser} />} />
                        <Route 
                            path="/manager" 
                            element={
                                <ProtectedRoute>
                                    <Manager />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
