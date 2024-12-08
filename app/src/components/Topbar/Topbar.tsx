import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logout from "../Buttons/Logout";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { getProblems } from "@/utils/problem"; // Django API'dan masalalar ro‘yxatini olish
import { Problem } from "@/utils/types/problem";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user, setUser] = useState<any>(null); // Foydalanuvchi ma'lumotlari
  const [problems, setProblems] = useState<Record<string, Problem>>({});
  const router = useRouter();

  // Django API orqali foydalanuvchini olish
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // JWT token
      const response = await fetch("http://127.0.0.1:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null); // Agar token yaroqsiz bo‘lsa
      }
    } catch (error) {
      console.error("Foydalanuvchini olishda xato:", error);
    }
  };

  // Masalalar ro‘yxatini olish
  const fetchProblems = async () => {
    try {
      const problemsData = await getProblems();
      setProblems(problemsData); // Masalalar ro‘yxatini saqlash
    } catch (error) {
      console.error("Masalalarni olishda xato:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProblems();
  }, []);

  const handleProblemChange = (isForward: boolean) => {
    const currentProblem = problems[router.query.pid as string];
    if (!currentProblem) return;

    const { order } = currentProblem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;

    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      // Birinchi masalaga o‘tish
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      // Oxirgi masalaga o‘tish
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
        <Link href="/" className="h-[22px] flex-1">
          <Image src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>

        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            <a
              href="https://www.buymeacoffee.com/burakorkmezz"
              target="_blank"
              rel="noreferrer"
              className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
            >
              Premium
            </a>
          </div>
          {!user && (
            <Link href="/auth">
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">Sign In</button>
            </Link>
          )}
          {user && problemPage && <Timer />}
          {user && (
            <div className="cursor-pointer group relative">
              <Image src="/avatar.png" alt="Avatar" width={30} height={30} className="rounded-full" />
              <div
                className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
