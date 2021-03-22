import { useEffect, useState } from "react";
import { German } from "./Languages";
import { English } from "./Languages";

export const Translate = (key) => {
  const lang =
    window.localStorage.getItem("language") != null
      ? window.localStorage.getItem("language")
      : "English";
  return lang === "English" ? English[key] : German[key];
};

export const Language = () => {
  const [language, setLanguage] = useState("EN");
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem("language", mode);
    setLanguage(mode);
  };

  useEffect(() => {
    const localLanguage = window.localStorage.getItem("language");
    localLanguage ? setLanguage(localLanguage) : setMode("EN");
    setMountedComponent(true);
  }, []);

  return [language, mountedComponent];
};
