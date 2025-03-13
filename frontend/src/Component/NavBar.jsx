import { Link, useNavigate } from "react-router-dom";
import Footer from "../Component/Footer"

const NavBar = ({ user, onLogout }) => {
    return (
        <>

            <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
                <div className='logo font-bold text-white text-2xl'>
                    <span className='text-green-700'> &lt;</span>
                    <span className='text-green-700'>i</span>
                    Pass
                    <span className='text-green-700'>word/&gt;</span>
                </div>
                <div>
                    {user ? (
                        <>
                            <Link to="/manager" className="mr-4">{user.name}</Link>
                            <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
                        </>
                    ) : (
                        <Link to="/" className="bg-green-700 px-3 py-1 rounded">Login</Link>
                    )}
                </div>

            </nav>
           
        </>
    );
};

export default NavBar;
