import _ from "lodash";
import en from "../../locales/en.json";
const DEFAULT_LANG = "en";



// TODO In future add more locale support
const localesList = {
  en: en,
};

const getCurrentLocale = (): string => {
  const lang = localStorage.getItem("lang");
  console.log(lang);
  if (!lang) {
    localStorage.setItem("lang", DEFAULT_LANG);
    return DEFAULT_LANG;
  } else {
    return lang;
  }
};
const useLocale = (
  key: string,
  options?: {
    variables: Record<string, string>;
    type: string;
  }
): string => {
  const getLocale = localesList[getCurrentLocale()] as Record<string, string>;
  const defaultLocales = localesList[DEFAULT_LANG];
  if (getLocale) {
    let text: string | Record<string, string> = getLocale[key]
      ? getLocale[key]
      : defaultLocales[key];
    if (options?.type && typeof text === "object") {
      text = text[options?.type] ?? Object.values(text)[0];
    }

    if (options?.variables) {
      Object.keys(options.variables).forEach((key) => {
        if (typeof text === "string") {
          text.replace(key, options.variables[key]);
        }
      });
    }
    return text as string;
  } else {
    return key;
  }
};

export default useLocale;
