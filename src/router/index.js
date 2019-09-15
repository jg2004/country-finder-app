import Router from "vue-router";
import Home from "@/views/Home";
import CountryDetails from "@/views/CountryDetails";
import Currency from "@/views/Currency";
import Language from "@/views/Language";
import PageNotFound from "@/views/PageNotFound";
import CurrencyDetails from "@/views/CurrencyDetails";
import LanguageDetails from "@/views/LanguageDetails";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },

  {
    name: "country-details",
    path: "/country/:countryId",
    component: CountryDetails,

    props: true
  },
  {
    name: "currency-details",
    path: "/currency/:currencyCode/:currencyName",
    component: CurrencyDetails,
    props: true
  },
  {
    name: "currency",
    path: "/currency",
    component: Currency
  },
  {
    name: "language",
    path: "/language",
    component: Language
  },
  {
    name: "language-details",
    path: "/language/:languageCode/:languageName",
    component: LanguageDetails,
    props: true
  },
  {
    name: "catchAll",
    path: "*",
    component: PageNotFound
  }
];
const router = new Router({
  mode: "history",
  routes,
  linkExactActiveClass: "active"
});

export default router;
