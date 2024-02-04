import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { signInStart, signInSuccessful, signInFailure } from '../redux/userSlice'
import FirebaseOth from '../components/FirebaseOth'

const Login = () => {
    const [formData, setFromData] = useState({});
    const { isLoading, isError } = useSelector((state) => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    const postData = async (e) => {
        try {
            e.preventDefault();
            dispatch(signInStart())
            await axios
                .post("http://localhost:4000/api/auth/login", formData)
                .then(async (res) => {
                    if (!res?.data?.success) {
                        dispatch(signInFailure(res.data))
                    } else {
                        dispatch(signInSuccessful(res.data))
                        navigate("/")
                    }
                })
        } catch (error) {
            console.log(error.message, "from Signup page");
            dispatch(signInFailure(error))
        }
    };

    return (
        <div className="mt-10 p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-medium text-center">Log In</h1>
            <form className="flex flex-col gap-2 mt-3" onSubmit={postData}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-slate-600 text-white font-medium p-3 rounded-lg text-[18px] uppercase hover:opacity-90 disabled:opacity-70"
                >
                    {isLoading ? "Loading ..." : "Log in"}
                </button>
                <FirebaseOth />
            </form>
            <div className="text-[18px] mt-3 flex gap-2">
                <p>Do not have an account?</p>
                <Link to="/signup">
                    <span className="text-blue-600 ">Sign Up</span>
                </Link>
            </div>
            <p className="text-red-600 text-[14px] mt-2 font-serif">
                {isError ? isError.message || "something wrong !!" : ""}
            </p>
        </div>
    );
}

export default Login