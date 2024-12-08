// utils/problems.ts
import axios from "axios";
import { Problem } from "./types/problem";

// API'dan masalalarni olish
export async function getProblems(): Promise<Problem[]> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/problems/api/problems/`);
    return res.data; // axios tomonidan yuborilgan ma'lumotlar
  } catch (error: any) { // error turini aniqlaymiz
    console.error("Masalalarni yuklashda xatolik:", error);
    if (error.response) {
      // server javob berdi, lekin xatolik bor (masalan, 404, 500)
      throw new Error(`Serverdan xatolik: ${error.response.status}`);
    } else if (error.request) {
      // serverga so'rov yuborildi, lekin javob olinmadi
      throw new Error("Serverga ulanishda xatolik yuz berdi");
    } else {
      // boshqa xatoliklar
      throw new Error(`Xatolik yuz berdi: ${error.message}`);
    }
  }
}

// Slug bo'yicha ma'lumot olish
export async function getProblemBySlug(slug: string): Promise<Problem> {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/problem/${slug}/`);
    return res.data; // axios tomonidan yuborilgan ma'lumotlar
  } catch (error: any) { // error turini aniqlaymiz
    console.error(`Masala topilmadi: ${slug}`, error);
    if (error.response) {
      // server javob berdi, lekin xatolik bor (masalan, 404, 500)
      throw new Error(`Masala topilmadi: ${slug}. Serverdan xatolik: ${error.response.status}`);
    } else if (error.request) {
      // serverga so'rov yuborildi, lekin javob olinmadi
      throw new Error(`Masala topilmadi: ${slug}. Serverga ulanishda xatolik`);
    } else {
      // boshqa xatoliklar
      throw new Error(`Masala topilmadi: ${slug}. Xatolik: ${error.message}`);
    }
  }
}
