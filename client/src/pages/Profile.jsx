import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../fireBaseConfig";
import axios from "axios";
import { updateFailure, updateStart, updateSuccessful } from "../redux/userSlice";

const Profile = () => {
    const { userData } = useSelector((state) => state.user);
    const [formData, setFromData] = useState({});
    console.log(formData.image);
    const [imageFile, setImageFile] = useState();

    const [imagePercentage, setImagePercentage] = useState(0);
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef(null);

    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (imageFile) handaleUploadImage(imageFile);
    }, [imageFile]);

    const handaleUploadImage = async (imageFile) => {
        const storageLocation = getStorage(app);
        const fileName = new Date().getDate() + imageFile.name;
        const storageRef = ref(storageLocation, fileName);
        const uploadImage = uploadBytesResumable(storageRef, imageFile);
        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const parcentage =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercentage(Math.round(parcentage));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref).then((downloadUrl) => {
                    setFromData({ ...formData, image: downloadUrl })
                });
            }
        );
    };


    const handlePostData = async (e) => {
        try {
            e.preventDefault();
            dispatch(updateStart());

            await axios.post(
                `http://localhost:4000/api/user/update/${userData?.data?.userData?._id}`,
                {
                    username,
                    email,
                    password,
                    image
                },
            ).then(res => {
                if (!res?.data?.success) {
                    dispatch(updateFailure(res));
                } else {
                    dispatch(updateSuccessful(res));
                }
            })

        } catch (error) {
            console.log(error.message, "from update page");
            dispatch(updateFailure(error));
        }
    };

    return (
        <div className="mt-10 p-3 max-w-lg mx-auto flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
                Profile
            </h2>
            <form action="" className="flex flex-col gap-4 mt-3" onSubmit={handlePostData}>
                <input
                    type="file"
                    ref={imgRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                <img
                    src={formData.image || userData?.data?.userData?.image}
                    className=" rounded-full w-28 h-28 object-cover self-center cursor-pointer"
                    alt="image"
                    onClick={() => imgRef.current.click()}
                />
                <p className="text-center">
                    {imageError ? (
                        <span>
                            Error uploading image (file size must be less than 2 MB)
                        </span>
                    ) : imagePercentage > 0 && imagePercentage < 100 ? (
                        <span className="text-slate-700">{`Uploading: ${imagePercentage} %`}</span>
                    ) : imagePercentage === 100 ? (
                        <span className="text-green-700">Image uploaded successfully</span>
                    ) : (
                        ""
                    )}
                </p>
                <input
                    type="text"
                    placeholder="User Name"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    name="username"
                    defaultValue={userData?.data?.userData?.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    name="email"
                    defaultValue={userData?.data?.userData?.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 bg-slate-300 text-black text-[18px] w-full rounded-lg"
                    onChange={handleChange}
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
