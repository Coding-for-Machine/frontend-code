// import '@ckeditor/ckeditor5-build-classic/build/styles.css'; // CKEditor CSS importi
import { useState, useEffect } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import axios from "axios"; // Django API so'rovlari uchun
import { DBProblem } from "../../../utils/problem";

import dynamic from 'next/dynamic';

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((mod) => mod.default),
  { ssr: false } // Bu CKEditor ni faqat clientda import qiladi
);

const ClassicEditor = dynamic(
  () => import('@ckeditor/ckeditor5-build-classic').then((mod) => mod.default),
  { ssr: false } // Bu CKEditor build'ini faqat clientda import qiladi
);



type ProblemDescriptionProps = {
  problem: DBProblem;
  _solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
  const [user, setUser] = useState<any>(null); // Foydalanuvchi holati
  const [updating, setUpdating] = useState(false);
  const [liked, setLiked] = useState(false); // Userning yoqtirganligi holati
  const [disliked, setDisliked] = useState(false); // Userning yoqtirmaganligi holati
  const [starred, setStarred] = useState(false); // Userning yulduzlash holati
  const [editorData, setEditorData] = useState<string>(problem.body || ""); // CKEditor uchun body ma'lumotlari

  useEffect(() => {
    // Django'dan foydalanuvchi ma'lumotlarini olish
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/user/"); // Django API orqali
        setUser(response.data);
      } catch (error) {
        console.error("Foydalanuvchi ma'lumotlarini olishda xato:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLike = async () => {
    if (!user) {
      toast.error("Muammoni yoqtirish uchun tizimga kirishingiz kerak", { position: "top-left", theme: "dark" });
      return;
    }
    if (updating) return;
    setUpdating(true);
    
    // Django API orqali yoqtirishni qayta ishlash
    try {
      await axios.post(`/api/problems/${problem.id}/like/`, { userId: user.id });
      setLiked(!liked);  // Foydalanuvchi yoqtirish holatini yangilash
    } catch (error) {
      console.error("Yoqumlashda xato:", error);
    }

    setUpdating(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("Muammoni yoqtirmaslik uchun tizimga kirishingiz kerak", { position: "top-left", theme: "dark" });
      return;
    }
    if (updating) return;
    setUpdating(true);

    // Django API orqali yoqtirmaslikni qayta ishlash
    try {
      await axios.post(`/api/problems/${problem.id}/dislike/`, { userId: user.id });
      setDisliked(!disliked);  // Foydalanuvchi yoqtirmaslik holatini yangilash
    } catch (error) {
      console.error("Yoqtirmaslikda xato:", error);
    }

    setUpdating(false);
  };

  const handleStar = async () => {
    if (!user) {
      toast.error("Muammoni yulduzlash uchun tizimga kirishingiz kerak", { position: "top-left", theme: "dark" });
      return;
    }
    if (updating) return;
    setUpdating(true);

    // Django API orqali yulduzlashni qayta ishlash
    try {
      await axios.post(`/api/problems/${problem.id}/star/`, { userId: user.id });
      setStarred(!starred);  // Foydalanuvchi yulduzlash holatini yangilash
    } catch (error) {
      console.error("Yulduzlashda xato:", error);
    }

    setUpdating(false);
  };

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div className="bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer">Tavsif</div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Muammo sarlavhasi */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">{problem?.title}</div>
            </div>
            <div className="flex items-center mt-3">
              <div
                className="inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize "
              >
                {problem.difficulty}
              </div>
              {_solved && (
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
              )}
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                onClick={handleLike}
              >
                {liked && !updating && <AiFillLike className="text-dark-blue-s" />}
                {!liked && !updating && <AiFillLike />}
                {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                onClick={handleDislike}
              >
                {disliked && !updating && <AiFillDislike className="text-dark-blue-s" />}
                {!disliked && !updating && <AiFillDislike />}
                {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                onClick={handleStar}
              >
                {starred && !updating && <AiFillStar className="text-yellow-500" />}
                {!starred && !updating && <TiStarOutline />}
                {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
              </div>
            </div>
          </div>

          {/* Muammo tavsifi */}
          <div className="mt-6 text-white text-sm space-y-4">
            <div className="font-medium">Muammo Tavsifi</div>
            {/* CKEditor 5 */}
            <CKEditor
              editor={ClassicEditor}
              data={editorData} // Django API'dan olingan body ma'lumotlari
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data); // Yangi ma'lumotlarni holatga yangilash
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
