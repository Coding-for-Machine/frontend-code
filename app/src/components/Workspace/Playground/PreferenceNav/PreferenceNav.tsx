import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import SettingsModal from "@/components/Modals/SettingsModal";

interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
  languages: { name: string; value: string; id: number }[]; // Language list
  selectedLanguage: string; // Selected language
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>; // Change selected language
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings, languages, selectedLanguage, setSelectedLanguage }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  // settingsModalIsOpen value check
  const openSettingsModal = () => {
    setSettings({ ...settings, settingsModalIsOpen: true });
  };

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="language-selector">
              <label htmlFor="language-select" className="text-white font-medium mr-2">
                Choose Language:
              </label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-dark-fill-3 text-white rounded px-2 py-1"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button className="preferenceBtn group" onClick={openSettingsModal}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
          </div>
          <div className="preferenceBtn-tooltip">To'liq ekran</div>
        </button>
      </div>

      {/* Modalni ko'rsatish uchun settingsModalIsOpen tekshiruvi */}
      {settings?.settingsModalIsOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};

export default PreferenceNav;
