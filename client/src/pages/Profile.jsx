import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { userData } = useSelector((state) => state.user);
    const [username, setUsername] = useState(userData?.data?.userData?.username);
    const [email, setEmail] = useState(userData?.data?.userData?.email);
    // const [username, setUsername] = useState(userData?.data?.userData?.username)

    const handleChange = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="mt-10 p-3 max-w-lg mx-auto flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
                Profile
            </h2>
            <form action="" className="flex flex-col gap-4 mt-3">
                <img
                    src={userData?.data?.userData?.image}
                    className=" rounded-full w-28 h-28 object-cover self-center cursor-pointer"
                    alt="image"
                />
                <input
                    type="text"
                    placeholder="User Name"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    name="email"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                // onChange={handleChange}
                />
                <button className="uppercase border p-3 text-black text-[18px] w-full rounded-lg bg-teal-600 hover:bg-opacity-80 font-semibold">
                    Update
                </button>
            </form>
            <div className="text-red-700 flex justify-between items-center">
                <span className="cursor-pointer hover:opacity-85">Delete Account</span>
                <span className="cursor-pointer hover:opacity-85">Sign Out</span>
            </div>
        </div>
    );
};

export default Profile;
