import "@/styles/globals.css"; // Global CSS birinchi o'rinda
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Foydalanuvchi xatoliklarini ushlab qolish uchun ErrorBoundary qo'shish (ixtiyoriy)
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "@/components/Fallback/Fallback"; // Fallback komponenti yaratish

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Coding for Machine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Web application that contains leetcode problems and video solutions"
        />
        {/* SEO optimizatsiyasi uchun qo'shimcha meta taglar */}
        <meta property="og:title" content="Coding for Machine" />
        <meta
          property="og:description"
          content="A web platform with Leetcode problems and video explanations"
        />
        <meta property="og:image" content="/hero-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      {/* Xatoliklarni ushlab qolish uchun ErrorBoundary */}
      <ErrorBoundary FallbackComponent={Fallback}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </ErrorBoundary>
    </RecoilRoot>
  );
}
