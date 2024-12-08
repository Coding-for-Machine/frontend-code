import axiosInstance from "./axiosInstance";

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get("/auth/user/");
    return response.data;
  } catch (error) {
    console.error("Foydalanuvchi ma'lumotlarini olishda xato:", error);
    throw error;
  }
};