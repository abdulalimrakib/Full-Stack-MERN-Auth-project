import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../fireBaseConfig'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signInSuccessful } from '../redux/userSlice'

const FirebaseOth = () => {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            console.log(result.user);

            axios.post("http://localhost:4000/api/auth/google", {
                username: result.user.displayName,
                email: result.user.email,
                image: result.user.photoURL,
            }).then((res) => {
                dispatch(signInSuccessful(res))
            })
        } catch (error) {
            console.log("error from FirebaseOth site: ", error.message);
        }
    }

    return (
        <button type='button' onClick={handleGoogleAuth} className='flex justify-center items-center gap-3 p-3 border rounded-lg hover:bg-gray-200'>
            <img src="../../public/Google__G__logo.svg.png" className='w-[25px] h-[25px]' alt="" />
            <span className='font-semibold text-[18px]'>Sign in with Google</span>
        </button>
    )
}

export default FirebaseOth