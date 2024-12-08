// utils/language.ts
import axios from "axios";

export async function getLanguagesByProblemSlug(slug: string) {
  try {
    const response = await axios.get(`/api/problem/${slug}`);
    return response.data.language; // Til ro'yxatini qaytarish
  } catch (error) {
    console.error("Til ro'yxatini olishda xato:", error);
    return [];
  }
}
