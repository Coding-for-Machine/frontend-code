import { useState, useEffect } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import { getLanguagesByProblemSlug } from "@/utils/language";
import { Problem } from "@/utils/types/problem";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);
  const [languages, setLanguages] = useState<{ name: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Til ro'yxatini olish
  useEffect(() => {
    const fetchLanguages = async () => {
      const languageList = await getLanguagesByProblemSlug(problem.slug);
      setLanguages(languageList);
      setSelectedLanguage(languageList[0]?.name || ""); // Birinchi tilni tanlash
    };

    fetchLanguages();
  }, [problem.slug]);

  return (
    <div>
      <Split className="split" minSize={0}>
        <ProblemDescription problem={problem} _solved={solved} />
        <div className="bg-dark-fill-2">
          {/* Tilni tanlash */}
          

          {/* Playground */}
          <Playground
            problem={problem}
            selectedLanguage={selectedLanguage} // Tanlangan tilni uzatish
            setSuccess={setSuccess}
            setSolved={setSolved}
          />

          {/* Success animatsiyasi */}
          {success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />}
        </div>
      </Split>
    </div>
  );
};

export default Workspace;
