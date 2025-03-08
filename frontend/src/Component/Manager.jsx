import React from 'react'
import { useRef } from 'react'

const Manager = () => {
    const ref = useRef()
    const showPassword = () =>{
        if(ref.current.src.includes("src/assets/Image/closeEye.png")){
            ref.current.src = "src/assets/Image/eye.png"
        }
        else{
            ref.current.src = "src/assets/Image/closeEye.png"
        }
    }
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="container px-4 sm:px-10 lg:px-20 py-10 mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    <span className='text-green-700'>i</span>
                    <span>Pass</span>
                    <span className="text-green-700">word/&gt;</span>
                </h1>
                <p className="text-green-800 text-lg text-center">Your Own Password Manager</p>

                <div className="text-black flex flex-col p-4 sm:p-6 gap-6 justify-center">
                    <input placeholder='Enter Website URL' className="w-full border border-green-400 bg-white py-2 px-4 rounded-full outline-none focus:ring-2 focus:ring-green-400" type="text" />

                    <div className="flex flex-col sm:flex-row gap-4">
                        <input placeholder='Enter Username' className="w-full sm:w-1/2 border border-green-400 bg-white py-2 px-4 rounded-full outline-none focus:ring-2 focus:ring-green-400" type="text" />

                        <div className="relative w-full sm:w-1/2">
                            <input placeholder='Enter Password' className="w-full border border-green-400 bg-white py-2 px-4 rounded-full outline-none focus:ring-2 focus:ring-green-400 pr-10" type="password" />
                            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="./src/assets/Image/eye.png" alt="Toggle Password" className="w-6 h-6" />
                            </span>
                        </div>
                    </div>

                    <button className="flex items-center justify-center bg-green-400 text-white px-8 py-3 rounded-full gap-3 w-fit mx-auto border border-green-600 hover:bg-green-700 hover:border-green-800 transition">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
            </div>
        </>
    )
}

export default Manager
