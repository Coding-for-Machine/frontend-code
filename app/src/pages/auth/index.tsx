import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import Navbar from "@/components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, setUser] = useState<any>(null); // Django foydalanuvchi ma'lumotlari
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          // Django API dan foydalanuvchini tekshirish
          const response = await axios.get("/api/auth/user/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // Foydalanuvchi ma'lumotlarini saqlash
        }
      } catch (error) {
        console.error("Autentifikatsiya xatosi:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser(); // Foydalanuvchini faqat dastlabki yuklashda olish
    }
  }, [user]); // Foydalanuvchi bo'lsa, yana tekshirmaymiz

  useEffect(() => {
    if (user) router.push("/"); // Agar foydalanuvchi mavjud bo'lsa, bosh sahifaga yo'naltirish
  }, [user, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Yuklanmoqda...</div>; // Sahifa yuklanayotgan paytda loader ko'rsatish
  }

  return (
    <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <Image src="/hero.png" alt="Hero img" width={700} height={700} />
        </div>
        {authModal.isOpen && <AuthModal />} {/* AuthModal ni ko'rsatish */}
      </div>
    </div>
  );
};

export default AuthPage;
