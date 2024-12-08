import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { getProblemBySlug, getProblems } from "@/utils/problem";
import { Problem } from "@/utils/types/problem";
import React from "react";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};
export default ProblemPage;

// fetch the local data
//  SSG
// getStaticPaths => it creates the dynamic routes
export async function getStaticPaths() {
  const problems = await getProblems();

  const paths = problems.map((problem) => ({
    params: { pid: problem.slug }, // URL'ga slug asosida yo'naltirish
  }));

  return {
    paths,
    fallback: false, // 404 sahifani ko'rsatadi, agar marshrut mavjud bo'lmasa
  };
}

// getStaticProps => it fetches the data for each page
export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = await getProblemBySlug(pid);

  if (!problem) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      problem,
    },
  };
}
