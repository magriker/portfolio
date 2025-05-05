import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      headerName: "Hi, I am Sophie Bolinski",
      headerIntroduction:
        "an industrial designer <3/> focusing on innovation and<3/> prototyping. Based in Tokyo.",
      chatchPhrase:
        "I want my work to be meaningful and helpful for people in every day life.",

      workExperience:
        "I have collaborated with several companies through university projects, as a working student, freelancer, and intern. These companies operate in the fields of industrial design, graphic design, and UX/UI design. Most recently, I worked with the German Maritime Museum in Bremerhaven to help create a more inclusive museum environment. In addition, I am currently freelancing for the University of Tokyo, where I support design research and electronic prototyping. For a complete overview of my work experience, please visit my LinkedIn profile.",
      bachelorIndustrialDesign: "Bachelor in Industrial design",
      uniForIndustrialDesign:
        "Burg Giebichenstein School of Art and Design Halle(Saale), Germany Graduation 02.2023",
      exchangeSemester: "Exchange Semester",
      artUniForexchangesemester:
        "Tokyo University of the Arts Tokyo, Japan 04.2022 - 10.2022",
      bachelorIt: "Bachelor International Media and IT",
      uniforIt: "HTW Berlin Berlin, Germany Graduation 10.2016",
    },
  },
  jp: {
    translation: {
      headerName: "私はソフィー・ボリンスキです。",
      headerIntroduction:
        "東京を拠点に活動する<1/>試作とイノベーションに根ざした<1/>インダストリアルデザイナーです。",
      chatchPhrase:
        "多くの人々の日々の生活のなかで、私の作品を、意味がありそして役立つものにしたいです。",
      workExperience:
        "これまで、大学プロジェクトをはじめ、ワーキングスチューデント、フリーランス、インターンとして、さまざまな企業と協働してきました。関わってきた分野は、インダストリアルデザイン、グラフィックデザイン、UX/UIデザインなど多岐にわたります。最近では、ドイツ・ブレーマーハーフェンにあるドイツ海洋博物館と連携し、インクルーシブなミュージアム環境の創出に取り組みました。また、現在は東京大学とフリーランス契約を結び、デザインリサーチおよび電子工作のプロトタイピングを担当しています。これまでの職務経歴についての詳細は、LinkedInプロフィールをご覧ください。",
      bachelorIndustrialDesign: "インダストリアルデザイン専攻（学士）",
      uniForIndustrialDesign:
        "ブルク・ギービヒェンシュタイン芸術大学（ドイツ）2023年2月 卒業",
      exchangeSemester: "交換留学",
      artUniForexchangesemester: "東京藝術大学 2022年4月 〜 2022年10月",
      bachelorIt: "国際メディアおよびIT専攻（学士）",
      uniforIt:
        "HTWベルリン（ベルリン工科経済応用科学大学)(ドイツ) 2016年10月 卒業",
      itUniforexchangesemester:
        "GardyneHolt(オークランド、ニュージーランド)実務実習 2014年9月 〜 2015年2月",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: "jp", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
