import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginRegister = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "/auth/login" : "/auth/register";
        const body = isLogin ? { email, password } : { name, email, password };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                setUser(data.user);
                navigate("/manager");
            } else {
                alert(data.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="flex justify-center mt-[20vh]  items-center  text-white">
                <div className="bg-gray-800 p-8 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,1)] w-96">
                    <h2 className="text-center text-2xl font-bold mb-4">
                        {isLogin ? "Login" : "Register"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded bg-gray-700 text-white"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            className="text-blue-400 underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </div>
            </div>

        </>
    );
};

export default LoginRegister;
