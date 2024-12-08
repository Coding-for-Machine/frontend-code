import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Problem } from "@/utils/types/problem";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import EditorFooter from "./EditorFooter";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getProblems } from "@/utils/problem";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import axiosInstance from "@/utils/axiosInstance";
import { getUserData } from "@/utils/auth";

const Playground: React.FC<{ problem: Problem; setSuccess: any; setSolved: any }> = ({
  setSuccess,
  setSolved,
  problem,
}) => {
  const [userCode, setUserCode] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("python");
  const [languages, setLanguages] = useState<any[]>([]);  // Til ro'yxatini saqlash uchun
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Foydalanuvchi ma'lumotlarini olish
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xato:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Til ro'yxatini olish uchun API so'rovini yuborish
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get("problems/api/problems");  // Til ma'lumotlarini olish
        const data = response.data;
        
        // Til ro'yxatini API javobidan olingan ma'lumotga moslashtirish
        const languagesList = data[0]?.language.map((lang: { name: string; value: string; id: number }) => ({
          name: lang.name,
          value: lang.value,
          id: lang.id,
        })) || [];

        setLanguages(languagesList);  // Til ro'yxatini saqlash
        setSelectedLanguage(languagesList[0]?.value || "python");  // Boshlang'ich tilni o'rnatish
      } catch (error) {
        console.error("Til ro'yxatini olishda xato:", error);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    try {
      // Tanlangan tilning ID'sini olish
      const selectedLanguageId = languages.find((lang) => lang.value === selectedLanguage)?.id || 1;

      const response = await axiosInstance.post("/api/problems/api/answers/", {
        answer: userCode,
        language: selectedLanguageId,
        problem: problem.id,
        user: user.id,
      });

      toast.success("Solution submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      setSolved(true);
    } catch (error: any) {
      console.error("Error submitting solution:", error.message);
      toast.error("Failed to submit solution", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav languages={languages} setSelectedLanguage={setSelectedLanguage} />

      <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60, 40]} minSize={60}>
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[selectedLanguage === "python" ? python() : javascript()]}
            onChange={(value) => setUserCode(value)}
          />
        </div>
      </Split>

      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;
