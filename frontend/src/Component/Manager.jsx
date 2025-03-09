import { useEffect, useState } from 'react';
import eyeIcon from '../assets/Image/eye.png';
import closeEyeIcon from '../assets/Image/closeEye.png';

const Manager = () => {
    const [Form, setForm] = useState({ site: '', username: '', password: '' });
    const [PasswordArray, setPasswordArray] = useState([]);
    const [showPass, setShowPass] = useState(false);

    const showPassword = () => {
        setShowPass(!showPass);
    };

    const handleChange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value });
    };

    const savePassword = () => {
        setPasswordArray([...PasswordArray, Form]);
        localStorage.setItem('passwords', JSON.stringify([...PasswordArray, Form]));
        console.log([...PasswordArray, Form])
    };

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
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
                    <h1 className="text-2xl font-bold rounded-md ">
                        Your Password
                    </h1>
                    {PasswordArray.length === 0 && <div>No Password To Show ....</div>}
                    {PasswordArray.length != 0 && <table className="table-auto w-full rounded-lg overflow-hidden">
                        <thead className="bg-green-800 text-white rounded-t-lg">
                            <tr>
                                <th className="px-4 py-2">Site</th>
                                <th className="px-4 py-2">UserName</th>
                                <th className="px-4 py-2">Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PasswordArray.map((item) => {
                                return <tr>
                                    <td className="text-center w-32 bg-green-200 rounded-l-lg px-4 py-2">{item.site}</td>
                                    <td className="text-center w-32 bg-green-200 px-4 py-2">{item.username}</td>
                                    <td className="text-center w-32 bg-green-200 rounded-r-lg px-4 py-2">{item.password}</td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;
