import store from "../store";
import { localeEnUS, localeRuRU } from "../consts";
import ru from "../locales/ru";
import en from "../locales/en";

const locales = {
  [localeRuRU]: ru,
  [localeEnUS]: en
};

export default function localizeFilter(key) {
  const locale = store.getters["locale"];
  return locales[locale][key];
}
