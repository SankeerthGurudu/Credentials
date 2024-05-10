import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "password"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = 'icons/eye.png'
            passwordRef.current.type = "password"
        } else {
            ref.current.src = 'icons/eyecross.png'
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
        console.log(passwordArray)
        setform({ site: "", username: "", password: "" })
    }

    const deletePassword = (id) => {
        console.log("deleting password with id ",id)
        let c=confirm("Do you really want to delete this password")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!=id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!=id)))
        }
    }

    const editPassword = (id) => {
        console.log("editing password with id ",id)
        setform(passwordArray.filter(i=>i.id==i.id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!=id))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (

        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="mycontainer text-white flex flex-col justify-center text-center">
                <div className='text-4xl'>
                    <span className='text-blue-700'>&lt;</span>
                    Pass
                    <span className='text-blue-700'>OP/&gt;</span>
                </div>
                <span className='text-blue-500 my-2'>Your own Passoword Manager</span>

                <div className='flex flex-col p-4 gap-6 text-black items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border-2 border-blue-600 p-4 py-1 w-full' type="text" name='site' />
                    <div className='flex gap-6 w-full'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border-2 border-blue-600 w-full p-4 py-1' type="text" name='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border-2 border-blue-600 w-full p-4 py-1' type="password" name='password' />
                            <span className='absolute right-1.5 top-1.5 cursor-pointer text-sm' onClick={showPassword}>
                                <img ref={ref} width={23} height={23} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-white flex justify-center items-center bg-blue-600 hover:bg-blue-500 rounded-full w-fit px-4 py-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#110a5c">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-blue-950'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-black text-center w-32'>
                                        <div className='flex justify-center items-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "6px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center w-32'>
                                        <div className='flex justify-center items-center'>{item.username}
                                            <div className='lordiconcopy' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "6px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center w-32'>
                                        <div className='flex justify-center items-center'>{item.password}
                                            <div className='lordiconcopy' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "6px", "paddingLeft": "6px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                    colors="primary:#ffffff" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-black text-center w-32'>
                                        <span className='mx-1 cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}
                                                colors="primary:#ffffff">
                                            </lord-icon>
                                        </span>
                                        <span className='mx-1 cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}
                                                colors="primary:#ffffff">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
