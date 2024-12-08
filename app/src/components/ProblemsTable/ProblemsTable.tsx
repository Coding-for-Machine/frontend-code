import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({ setLoadingProblems }) => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });

  const problems = useGetProblems(setLoadingProblems); // Masalalar ro'yxatini olish
  const solvedProblems = useGetSolvedProblems(); // Yechilgan masalalar ro'yxatini olish

 

  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, idx) => {
          const difficulyColor =
            problem.difficulty === "Oson"
              ? "text-dark-green-s"
              : problem.difficulty === "O'rta"
              ? "text-dark-yellow"
              : "text-dark-pink";

          return (
            <tr className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`} key={problem.id}>
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                {solvedProblems.includes(problem.id) && (
                  <BsCheckCircle fontSize={"18"} width="18" />
                )}
              </th>
              <td className="px-6 py-4">
			  <Link href={`/${problem.link}`} className="hover:text-blue-600 cursor-pointer">
				{problem.title}
			  </Link>

              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>{problem.difficulty}</td>
              <td className={"px-6 py-4"}>{problem.category}</td>
              <td className={"px-6 py-4"}>
               Vedia
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
  const [problems, setProblems] = useState<
    { id: number; title: string; difficulty: string; category: string; videoId: string | null; link: string }[]
  >([]);

  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true); // Yuklanish holatini yoqish
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL; // .env'dagi API URL
        const response = await fetch(`${API_URL}/problems/api/problems/`);
        if (response.ok) {
          const data = await response.json();
          const formattedProblems = data.map((problem: any) => ({
            id: problem.id,
            title: problem.name,
            difficulty: problem.status,
            category: problem.category || "Umumiy",
            videoId: null,
            link: `/problems/${problem.slug}`,
          }));
          setProblems(formattedProblems);
        } else {
          console.error("Failed to fetch problems:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
      setLoadingProblems(false); // Yuklanish holatini o'chirish
    };

    getProblems();
  }, [setLoadingProblems]);

  return problems;
}

function useGetSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState<number[]>([]);

  useEffect(() => {
    const getSolvedProblems = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL; // .env'dagi API URL
        const response = await fetch(`${API_URL}/users/api/solved-problems/`);
        if (response.ok) {
          const data = await response.json();
          setSolvedProblems(data.solvedProblems || []);
        } else {
          console.error("Failed to fetch solved problems:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    getSolvedProblems();
  }, []);

  return solvedProblems;
}
