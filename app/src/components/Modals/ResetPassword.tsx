import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // axiosInstance import qilish
import { toast } from "react-toastify";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/password-reset/", { email });

      if (response.status === 200) {
        toast.success("Password reset email sent", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Error sending password reset email", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
      <h3 className="text-xl font-medium text-white">Reset Password</h3>
      <p className="text-sm text-white">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
        to reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
          placeholder="name@company.com"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
