import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import exios from "axios";
import FirebaseOth from "../components/FirebaseOth";

const Signup = () => {
    const [formData, setFromData] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    const postData = async (e) => {
        try {
            e.preventDefault();
            setIsError(false);
            setIsLoading(true);
            await exios
                .post("http://localhost:4000/api/auth/signup", formData)
                .then((res) => {
                    setIsLoading(false);
                    if (!res?.data?.success) {
                        setIsError(true);
                    } else
                        navigate("/login")
                })

        } catch (error) {
            console.log(error.message, "from Signup page");
            setIsLoading(false);
            setIsError(true);
        }
    };

    return (
        <div className="mt-10 p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-medium text-center">Sign Up</h1>
            <form className="flex flex-col gap-2 mt-3" onSubmit={postData}>
                <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    onChange={handleChange}
                />
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
                    {isLoading ? "Loading ..." : "sign up"}
                </button>
                <FirebaseOth />
            </form>
            <div className="text-[18px] mt-3 flex gap-2">
                <p>Have a account?</p>
                <Link to="/login">
                    <span className="text-blue-600 ">Log in</span>
                </Link>
            </div>
            <p className="text-red-600 text-[14px] mt-2 font-serif">
                {isError ? "something wrong !!" : ""}
            </p>
        </div>
    );
};

export default Signup;
