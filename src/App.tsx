import { useEffect } from "react";
import { Backgrounds } from "@Components/Backgrounds/utils";
import { Astrostation } from "@Root/src/components/Homepage/Astrostation";
import { InfoSection } from "@Root/src/components/Homepage/InfoSectionHomePage"
import { SideNav } from "@Components/Nav/SideNav";
import {
  useDarkToggleStore,
  useFirstTimeUserStore,
  useBreakStarted,
  useSeoVisibilityStore,
} from "@Store";
import { Toaster } from "react-hot-toast";
import { version } from "@Root/package.json";
import { Walkthrough } from "@Components/Walkthrough/Walkthrough";
import useSetDefault from "@App/utils/hooks/useSetDefault";
import clsx from "clsx";
import { useRef } from "react";


enum backgrounds {
  CITY,
  FADE,
  GRADIENT,
  JAPAN,
  COTTAGE,
  LOFIGIRL,
  TRAIN,
  DVD,
  UNSPLASH,
}

function App() {
  const isDark = useDarkToggleStore((state) => state.isDark);
  const { isFirstTimeUser } = useFirstTimeUserStore();
  const { breakStarted } = useBreakStarted();
  const setDefault = useSetDefault();
  const { isSeoVisible, setSeoVisibility } = useSeoVisibilityStore();
  const astroStationRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (astroStationRef.current) {
      astroStationRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setSeoVisibility(!isSeoVisible);
    }, 700);

  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    } 
  }, [isDark]);

  useEffect(() => {
    if (!localStorage.APP_VERSION || localStorage.APP_VERSION != version) {
      setDefault();
      localStorage.setItem("APP_VERSION", version);
    }
  }, []);


  return (
    <>
      {isFirstTimeUser && <Walkthrough />}
      <Backgrounds backgrounds={backgrounds} />
      <div id="entire-app"
        className={clsx(
          `fixed inset-0 scrollbar-hide ${isSeoVisible ? `overflow-auto` : `overflow-hidden`}`,
          breakStarted && "bg-blue-500 bg-opacity-40"
        )}
      >
        <Toaster />
        <SideNav />
        <Astrostation ref={astroStationRef} backgrounds={backgrounds} />
        <InfoSection onButtonClick={handleButtonClick} isSeoVisible={isSeoVisible} />

      </div>
    </>
  );
}

export default App;
