// import { authModalState } from "@/atoms/authModalAtom";
// import { auth, firestore } from "@/firebase/firebase";
// import { useEffect, useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { useRouter } from "next/router";
// import { doc, setDoc } from "firebase/firestore";
// import { toast } from "react-toastify";
// import axiosInstance from "../../utils/axiosInstance";  // axios instance import

// type SignupProps = {};

// const Signup: React.FC<SignupProps> = () => {
//     const setAuthModalState = useSetRecoilState(authModalState);
//     const handleClick = () => {
//         setAuthModalState((prev) => ({ ...prev, type: "login" }));
//     };
//     const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
//     const router = useRouter();
//     const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

//     const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!inputs.email || !inputs.password || !inputs.displayName) return alert("Please fill all fields");

//         try {
//             toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
//             const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
//             if (!newUser) return;

//             const userData = {
//                 uid: newUser.user.uid,
//                 email: newUser.user.email,
//                 displayName: inputs.displayName,
//                 createdAt: Date.now(),
//                 updatedAt: Date.now(),
//                 likedProblems: [],
//                 dislikedProblems: [],
//                 solvedProblems: [],
//                 starredProblems: [],
//             };

//             // Firebase ma'lumotlarini Firestore’ga qo‘shish
//             await setDoc(doc(firestore, "users", newUser.user.uid), userData);

//             // Django API’ga foydalanuvchi ma'lumotlarini yuborish
//             try {
//                 const response = await axiosInstance.post("/register/", {
//                     email: newUser.user.email,
//                     displayName: inputs.displayName,
//                     uid: newUser.user.uid,
//                 });
//                 console.log("Django API response:", response.data);
//             } catch (error) {
//                 console.error("Django API error:", error);
//             }

//             router.push("/");
//         } catch (error: any) {
//             toast.error(error.message, { position: "top-center" });
//         } finally {
//             toast.dismiss("loadingToast");
//         }
//     };

//     useEffect(() => {
//         if (error) alert(error.message);
//     }, [error]);

//     return (
//         <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
//             <h3 className="text-xl font-medium text-white">CfM ro'yxatdan o'ting</h3>
//             <div>
//                 <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
//                     Email
//                 </label>
//                 <input
//                     onChange={handleChangeInput}
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
//                     placeholder="name@company.com"
//                 />
//             </div>
//             <div>
//                 <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
//                     Ko'rsatiladigan ism
//                 </label>
//                 <input
//                     onChange={handleChangeInput}
//                     type="text"
//                     name="displayName"
//                     id="displayName"
//                     className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
//                     placeholder="John Doe"
//                 />
//             </div>
//             <div>
//                 <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
//                     Parol
//                 </label>
//                 <input
//                     onChange={handleChangeInput}
//                     type="password"
//                     name="password"
//                     id="password"
//                     className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
//                     placeholder="*******"
//                 />
//             </div>

//             <button
//                 type="submit"
//                 className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
//             >
//                 {loading ? "Registering..." : "Register"}
//             </button>

//             <div className="text-sm font-medium text-gray-300">
//                 Allaqachon hisobingiz bor?{" "}
//                 <a href="#" className="text-blue-700 hover:underline" onClick={handleClick}>
//                     Kirish
//                 </a>
//             </div>
//         </form>
//     );
// };

// export default Signup;

import { authModalState } from "@/atoms/authModalAtom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance"; // axios instance import

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = () => {
        setAuthModalState((prev) => ({ ...prev, type: "login" }));
    };
    const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
    const router = useRouter();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password || !inputs.displayName) {
            alert("Please fill all fields");
            return;
        }

        try {
            toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });

            // Django API’ga foydalanuvchi ma'lumotlarini yuborish
            const response = await axiosInstance.post("/register/", {
                email: inputs.email,
                displayName: inputs.displayName,
                password: inputs.password,
            });

            if (response.status === 201) {
                toast.success("Account created successfully!", { position: "top-center" });
                router.push("/"); // Bosh sahifaga yo‘naltirish
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.detail || error.message || "An unknown error occurred";
            toast.error(errorMessage, { position: "top-center" });
        } finally {
            toast.dismiss("loadingToast");
        }
    };

    return (
        <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
            <h3 className="text-xl font-medium text-white">CfM ro'yxatdan o'ting</h3>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                    Email
                </label>
                <input
                    onChange={handleChangeInput}
                    type="email"
                    name="email"
                    id="email"
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    placeholder="name@company.com"
                />
            </div>
            <div>
                <label htmlFor="displayName" className="text-sm font-medium block mb-2 text-gray-300">
                    Ko'rsatiladigan ism
                </label>
                <input
                    onChange={handleChangeInput}
                    type="text"
                    name="displayName"
                    id="displayName"
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
                    Parol
                </label>
                <input
                    onChange={handleChangeInput}
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                    placeholder="*******"
                />
            </div>

            <button
                type="submit"
                className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
            >
                {"Register"}
            </button>

            <div className="text-sm font-medium text-gray-300">
                Allaqachon hisobingiz bor?{" "}
                <a href="#" className="text-blue-700 hover:underline" onClick={handleClick}>
                    Kirish
                </a>
            </div>
        </form>
    );
};

export default Signup;

