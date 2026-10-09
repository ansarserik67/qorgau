/**
 * Interface translations (EN / RU / KZ).
 *
 * Scope for the first iteration, as agreed in the product brief: navigation,
 * hero, CTA buttons, key section headings, footer and dashboard labels.
 * Long-form explanatory copy remains in English until professional
 * translation is available — we prefer honest partial translation over
 * machine-quality text everywhere.
 */

export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "kz", label: "KZ", labelKz: "ҚАЗ", name: "Қазақша" },
] as const;

export type Lang = (typeof LANGUAGES)[number]["code"];

const en = {
  "nav.technology": "Technology",
  "nav.platform": "Platform",
  "nav.map": "Hazard Map",
  "nav.about": "About",
  "nav.dashboard": "Dashboard",
  "nav.contact": "Contact",
  "cta.pilot": "Request a Pilot",
  "cta.explore": "Explore the Technology",
  "cta.discuss": "Discuss a Pilot",
  "cta.viewMap": "Open the hazard map",

  "hero.eyebrow": "Road safety technology · Kazakhstan",
  "hero.title": "Safer roads start with earlier detection.",
  "hero.desc":
    "QORGAU is developing intelligent road safety technology to detect livestock near roads and help warn drivers before dangerous encounters.",
  "hero.status": "Prototype in development",
  "hero.feature1": "Livestock Detection",
  "hero.feature2": "Roadside Alerts",
  "hero.feature3": "Hazard Monitoring",
  "hero.simulated": "Illustrative rendering — not a live camera feed",

  "home.problem.title": "An unexpected hazard can change everything.",
  "home.solution.title": "From detection to warning.",
  "home.solution.detect": "Detect",
  "home.solution.analyze": "Analyze",
  "home.solution.warn": "Warn",
  "home.architecture.title": "Designed as one connected system.",
  "home.showcase.title": "A closer look at detection.",
  "home.mapPreview.title": "Understand where risks occur.",
  "home.pilot.title": "Help us test a safer approach.",
  "home.pilot.text":
    "We are looking for road safety professionals, regional administrations, transport companies, and livestock owners willing to discuss and evaluate the QORGAU prototype.",

  "page.technology.title": "How the technology works",
  "page.platform.title": "The monitoring platform",
  "page.map.title": "Road hazard map",
  "page.about.title": "About QORGAU",
  "page.contact.title": "Let's evaluate a safer road.",
  "page.dashboard.title": "Monitoring dashboard",

  "demo.badge": "Demo data",
  "demo.environment": "Demo environment",

  "footer.tagline":
    "QORGAU is an early-stage Kazakhstan road safety technology startup developing livestock hazard detection for rural roads.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Use",
  "footer.market": "Intended initial market: Kazakhstan",
  "footer.disclaimer":
    "QORGAU is an early-stage prototype. All events, devices and map markers shown on this website are simulated demonstration data, not live measurements. Nothing here claims deployment, accident prevention or partnership with government bodies.",
  "footer.navigation": "Navigation",
  "footer.contact": "Contact",
  "footer.contactNote": "Contact details are published once configured by the team.",
};

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
  "nav.technology": "Технология",
  "nav.platform": "Платформа",
  "nav.map": "Карта опасностей",
  "nav.about": "О нас",
  "nav.dashboard": "Панель",
  "nav.contact": "Контакты",
  "cta.pilot": "Запросить пилот",
  "cta.explore": "Изучить технологию",
  "cta.discuss": "Обсудить пилот",
  "cta.viewMap": "Открыть карту опасностей",

  "hero.eyebrow": "Технологии безопасности дорог · Казахстан",
  "hero.title": "Безопасность на дороге начинается с раннего обнаружения.",
  "hero.desc":
    "QORGAU разрабатывает интеллектуальную систему безопасности дорог, которая обнаруживает скот рядом с проезжей частью и помогает своевременно предупреждать водителей.",
  "hero.status": "Прототип в разработке",
  "hero.feature1": "Обнаружение скота",
  "hero.feature2": "Дорожные оповещения",
  "hero.feature3": "Мониторинг опасностей",
  "hero.simulated": "Иллюстративная визуализация — не онлайн-видеопоток",

  "home.problem.title": "Неожиданная опасность может изменить всё.",
  "home.solution.title": "От обнаружения к предупреждению.",
  "home.solution.detect": "Обнаружить",
  "home.solution.analyze": "Проанализировать",
  "home.solution.warn": "Предупредить",
  "home.architecture.title": "Спроектирована как единая связанная система.",
  "home.showcase.title": "Как работает обнаружение.",
  "home.mapPreview.title": "Понимайте, где возникают риски.",
  "home.pilot.title": "Помогите нам проверить более безопасный подход.",
  "home.pilot.text":
    "Мы ищем специалистов по безопасности дорожного движения, региональные администрации, транспортные компании и владельцев скота, готовых обсудить и оценить прототип QORGAU.",

  "page.technology.title": "Как работает технология",
  "page.platform.title": "Платформа мониторинга",
  "page.map.title": "Карта дорожных опасностей",
  "page.about.title": "О QORGAU",
  "page.contact.title": "Давайте оценим более безопасную дорогу.",
  "page.dashboard.title": "Панель мониторинга",

  "demo.badge": "Демо-данные",
  "demo.environment": "Демонстрационная среда",

  "footer.tagline":
    "QORGAU — стартап на ранней стадии из Казахстана, разрабатывающий технологию обнаружения скота на загородных дорогах.",
  "footer.privacy": "Политика конфиденциальности",
  "footer.terms": "Условия использования",
  "footer.market": "Предполагаемый первый рынок: Казахстан",
  "footer.disclaimer":
    "QORGAU — прототип на ранней стадии. Все события, устройства и метки на карте на этом сайте — симуляционные демонстрационные данные, а не реальные измерения. Ничто здесь не заявляет о развёртывании, предотвращении аварий или партнёрстве с государственными органами.",
  "footer.navigation": "Навигация",
  "footer.contact": "Контакты",
  "footer.contactNote": "Контактные данные будут опубликованы после их настройки командой.",
};

const kz: Record<TranslationKey, string> = {
  "nav.technology": "Технология",
  "nav.platform": "Платформа",
  "nav.map": "Қауіп картасы",
  "nav.about": "Біз туралы",
  "nav.dashboard": "Тақта",
  "nav.contact": "Байланыс",
  "cta.pilot": "Пилот өтінімі",
  "cta.explore": "Технологиямен танысу",
  "cta.discuss": "Пилотты талқылау",
  "cta.viewMap": "Қауіп картасын ашу",

  "hero.eyebrow": "Жол қауіпсіздігі технологиясы · Қазақстан",
  "hero.title": "Жол қауіпсіздігі ертерек анықтаудан басталады.",
  "hero.desc":
    "QORGAU жол жағасындағы малды анықтап, қауіпті жағдайларда жүргізушілерді уақылы ескертетін ақылды жол қауіпсіздігі технологиясын әзіреп жатыр.",
  "hero.status": "Прототип әзірлеу кезеңінде",
  "hero.feature1": "Малды анықтау",
  "hero.feature2": "Жол ескертулері",
  "hero.feature3": "Қауіп мониторингі",
  "hero.simulated": "Түсіндірмелік көрініс — тікелей бейне ағын емес",

  "home.problem.title": "Күтпеген қауіп бәрін өзгертуі мүмкін.",
  "home.solution.title": "Анықтаудан ескертуге дейін.",
  "home.solution.detect": "Анықтау",
  "home.solution.analyze": "Талдау",
  "home.solution.warn": "Ескерту",
  "home.architecture.title": "Біртұтас жүйе ретінде жасалған.",
  "home.showcase.title": "Анықтау қалай жұмыс істейді.",
  "home.mapPreview.title": "Қауіп қайдан туындайтынын түсініңіз.",
  "home.pilot.title": "Қауіпсізірек тәсілді бірге сынауға көмектесіңіз.",
  "home.pilot.text":
    "Біз QORGAU прототипін талқылап, бағалауға дайын жол қауіпсіздігі мамандарын, өңірлік әкімдіктерді, көлік компанияларын және мал иелерін іздеудеміз.",

  "page.technology.title": "Технология қалай жұмыс істейді",
  "page.platform.title": "Мониторинг платформасы",
  "page.map.title": "Жол қауіптер картасы",
  "page.about.title": "QORGAU туралы",
  "page.contact.title": "Қауіпсізірек жолды бірге бағалайық.",
  "page.dashboard.title": "Мониторинг тақтасы",

  "demo.badge": "Демо-деректер",
  "demo.environment": "Демонстрациялық орта",

  "footer.tagline":
    "QORGAU — Қазақстаннан шыққан ерте кезеңдегі стартап: ауыл жолдарындағы мал қауіптерін анықтау технологиясын әзіреп жатыр.",
  "footer.privacy": "Құпиялылық саясаты",
  "footer.terms": "Пайдалану шарттары",
  "footer.market": "Бастапқы нарық: Қазақстан",
  "footer.disclaimer":
    "QORGAU — ерте кезеңдегі прототип. Осы сайттағы барлық оқиғалар, құрылғылар және карта белгілері — симуляциялық демо-деректер, нақты өлшемдер емес. Мұнда деклойменттік, апаттың алдын алу немесе мемлекеттік органдармен серіктестік туралы ешқандай мәлімдама жоқ.",
  "footer.navigation": "Навигация",
  "footer.contact": "Байланыс",
  "footer.contactNote": "Байланыс деректері команда орнатқаннан кейін жарияланады.",
};

export const DICTIONARY: Record<Lang, Record<TranslationKey, string>> = {
  en,
  ru,
  kz,
};

export function translate(lang: Lang, key: TranslationKey): string {
  return DICTIONARY[lang][key] ?? DICTIONARY.en[key];
}

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "ru" || value === "kz";
}

/** Locale used for date/number formatting per language. */
export const LOCALE_BY_LANG: Record<Lang, string> = {
  en: "en-GB",
  ru: "ru-RU",
  kz: "kk-KZ",
};
