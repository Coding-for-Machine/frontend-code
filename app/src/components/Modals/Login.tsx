import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { authModalState } from "@/atoms/authModalAtom";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  // State for form inputs
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return toast.error("Iltimos, barcha maydonlarni to‘ldiring");
    }

    try {
      setLoading(true);
      toast.loading("Tizimga kiritilmoqda...", { position: "top-center", toastId: "loadingToast" });

      // Fetch API base URL from .env
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Send POST request to the login endpoint
      const response = await axios.post(`${API_URL}/login/`, {
        email: inputs.email,
        password: inputs.password,
      });

      // Save JWT token to localStorage
      const { token } = response.data;
      localStorage.setItem("jwt", token);

      toast.success("Tizimga muvaffaqiyatli kirdingiz!", { position: "top-center" });
      router.push("/"); // Redirect to the homepage

    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login muvaffaqiyatsiz bo'ldi. Iltimos, ma'lumotlarni tekshiring.",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
      toast.dismiss("loadingToast");
    }
  };

  // Handle modal state change
  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <h3 className="text-xl font-medium text-white">Tizimga kirish</h3>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Email
        </label>
        <input
          onChange={handleInputChange}
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
          Parolingiz
        </label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="*******"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        {loading ? "Kirish..." : "Kirish"}
      </button>

      {/* Forgot Password */}
      <button className="flex w-full justify-end" onClick={() => handleClick("forgotPassword")}>
        <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">
          Parolni unutdingizmi?
        </a>
      </button>

      {/* Register Link */}
      <div className="text-sm font-medium text-gray-300">
        Ro‘yxatdan o‘tmaganmisiz?{" "}
        <a href="#" className="text-blue-700 hover:underline" onClick={() => handleClick("register")}>
          Hisob yaratish
        </a>
      </div>
    </form>
  );
};

export default Login;
