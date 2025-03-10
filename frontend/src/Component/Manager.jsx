import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import eyeIcon from '../assets/Image/eye.png';
import closeEyeIcon from '../assets/Image/closeEye.png';
import copyButton from "../assets/Image/copy.png"
import editButton from "../assets/Image/edit.png"
import deleteButton from "../assets/Image/delete.png"

const Manager = () => {
    const [Form, setForm] = useState({ site: '', username: '', password: '' });
    const [PasswordArray, setPasswordArray] = useState([]);
    const [showPass, setShowPass] = useState(false);

    const showPassword = () => {
        setShowPass(!showPass);
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    }

    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value });
    };

    const savePassword = () => {
        setPasswordArray([...PasswordArray, Form]);
        localStorage.setItem('passwords', JSON.stringify([...PasswordArray, Form]));
    };

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    return (
        <>
            <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="container px-4 sm:px-10 lg:px-20 py-10 mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    <span className="text-green-700">i</span>
                    <span>Pass</span>
                    <span className="text-green-700">word/&gt;</span>
                </h1>
                <p className="text-green-800 text-lg text-center">Your Own Password Manager</p>

                <div className="text-black flex flex-col p-4 sm:p-6 gap-6 justify-center">
                    <input
                        value={Form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                        name="site"
                        className="w-full border border-green-400 bg-white py-2 px-4 rounded-full outline-none focus:ring-2 focus:ring-green-400"
                        type="text"
                    />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            value={Form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            name="username"
                            className="w-full sm:w-1/2 border border-green-400 bg-white py-2 px-4 rounded-full outline-none focus:ring-2 focus:ring-green-400"
                            type="text"
                        />

                        <div className="relative w-full sm:w-1/2">
                            <input
                                value={Form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                name="password"
                                className="w-full border border-green-400 bg-white py-2 px-4 rounded-full outline-none focus:ring-2 focus:ring-green-400 pr-10"
                                type={showPass ? 'text' : 'password'}
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={showPassword}>
                                <img src={showPass ? closeEyeIcon : eyeIcon} alt="Toggle Password" className="w-6 h-6" />
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="flex items-center justify-center bg-green-400 text-white px-8 py-3 rounded-full gap-3 w-fit mx-auto border border-green-600 hover:bg-green-700 hover:border-green-800 transition">
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Add Password
                    </button>
                </div>

                <div>
                    <h1 className="text-2xl font-bold rounded-md">Your Password</h1>

                    {PasswordArray.length === 0 && <div>No Password To Show ....</div>}

                    {PasswordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full min-w-max rounded-lg overflow-hidden border border-gray-400 border-collapse">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left whitespace-nowrap text-sm sm:text-base">Site</th>
                                        <th className="px-4 py-3 text-left whitespace-nowrap text-sm sm:text-base">UserName</th>
                                        <th className="px-4 py-3 text-left whitespace-nowrap text-sm sm:text-base">Password</th>
                                        <th className="px-4 py-3 text-center whitespace-nowrap text-sm sm:text-base">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {PasswordArray.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-300 hover:bg-green-100 transition duration-200">
                                            <td className="bg-green-200 px-4 py-3 border-r border-gray-400 min-w-[120px] text-sm sm:text-base">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-700 truncate">{item.site}</span>
                                                    <img src={copyButton} alt="Copy" className="w-5 h-5 cursor-pointer hover:opacity-80 transition duration-200" onClick={() => copyText(item.site)} />
                                                </div>
                                            </td>

                                            <td className="bg-green-200 px-4 py-3 border-r border-gray-400 min-w-[120px] text-sm sm:text-base">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-700 truncate">{item.username}</span>
                                                    <img src={copyButton} alt="Copy" className="w-5 h-5 cursor-pointer hover:opacity-80 transition duration-200" onClick={() => copyText(item.username)} />
                                                </div>
                                            </td>

                                            <td className="bg-green-200 px-4 py-3 border-r border-gray-400 min-w-[120px] text-sm sm:text-base">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-medium text-gray-700 truncate">{item.password}</span>
                                                    <img src={copyButton} alt="Copy" className="w-5 h-5 cursor-pointer hover:opacity-80 transition duration-200" onClick={() => copyText(item.password)} />
                                                </div>
                                            </td>

                                            <td className="w-24 bg-green-200 px-4 py-3 flex justify-center items-center space-x-2 border-l border-gray-400 rounded-r-lg">
                                                <img src={editButton} alt="Edit" className="w-5 h-5 cursor-pointer hover:scale-110 transition duration-200" />
                                                <img src={deleteButton} alt="Delete" className="w-5 h-5 cursor-pointer hover:scale-110 transition duration-200" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Manager;
