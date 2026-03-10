// Content localization system for Quran, Hadith, and lectures
// Supports multiple languages and dialect variants

export interface LocalizedContent {
  id: string;
  type: "quran" | "hadith" | "lecture";
  languages: Record<string, ContentTranslation>;
  defaultLanguage: string;
}

export interface ContentTranslation {
  title: string;
  description: string;
  content: string;
  author?: string;
  source?: string;
  dialects?: Record<string, DialogVariant>;
}

export interface DialogVariant {
  title: string;
  content: string;
}

// Sample Quranic content with multilingual support
export const quranContent: LocalizedContent[] = [
  {
    id: "surah-yasin",
    type: "quran",
    defaultLanguage: "ar",
    languages: {
      ar: {
        title: "سورة يس",
        description: "واحدة من أعظم السور في القرآن الكريم",
        content:
          "يس ۝ وَالْقُرْآنِ الْحَكِيمِ ۝ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ۝ عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ",
        source: "Quran 36:1-4",
      },
      en: {
        title: "Surah Yasin (Chapter 36)",
        description: "One of the greatest chapters in the Holy Quran",
        content:
          "Ya-Sin. By the Quran full of wisdom, You are indeed one of the messengers, On a Straight Path",
        source: "Quran 36:1-4",
      },
      hi: {
        title: "सूरह यासीन",
        description: "कुरान के महानतम अध्यायों में से एक",
        content:
          "या-सीन। ज्ञान से भरी कुरान के द्वारा, आप निश्चित रूप से रसूलों में से एक हैं, सीधे रास्ते पर",
        source: "कुरान 36:1-4",
      },
      ur: {
        title: "سورہ یس",
        description: "قرآن کے عظیم ترین سورتوں میں سے ایک",
        content:
          "یس وَالْقُرْآنِ الْحَكِيمِ۔ آپ یقینی طور پر رسولوں میں سے ایک ہیں، سیدھے راستے پر",
        source: "قرآن 36:1-4",
        dialects: {
          "ur-IN": {
            title: "سورہ یٰس (ہندوستانی اردو)",
            content:
              "یٰس وَالْقُرْآنِ الْحَکِیم۔ بھائی، آپ یقیناً رسولوں میں سے ہیں، سیدھے راستے پر",
          },
          "ur-PK": {
            title: "سورہ یس (پاکستانی اردو)",
            content:
              "یس وَالْقُرْآنِ الْحَكِيمِ۔ تم یقینی طور پر رسولوں میں سے ایک ہو، سیدھے راستے پر",
          },
        },
      },
      bn: {
        title: "সূরা ইয়াসিন",
        description: "পবিত্র কুরআনের অন্যতম শ্রেষ্ঠ অধ্যায়",
        content:
          "ইয়া-সিন। প্রজ্ঞায় পূর্ণ কুরআনের দ্বারা, আপনি অবশ্যই রসূলদের মধ্যে একজন, সঠিক পথে",
        source: "কুরআন 36:1-4",
      },
    },
  },
  {
    id: "ayat-kursi",
    type: "quran",
    defaultLanguage: "ar",
    languages: {
      ar: {
        title: "آية الكرسي",
        description: "أعظم آية في كتاب الله",
        content:
          "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
        source: "Quran 2:255",
      },
      en: {
        title: "Ayat Al-Kursi (The Throne Verse)",
        description: "The Greatest Verse in the Book of Allah",
        content:
          "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
        source: "Quran 2:255",
      },
      hi: {
        title: "आयत अल-कुरसी",
        description: "अल्लाह की किताब का सबसे महान आयत",
        content:
          "अल्लाह - उसके अलावा कोई देवता नहीं है, सदा जीवित रहने वाला, अस्तित्व को बनाए रखने वाला। न तो नींद उसे छूती है और न ही नींद।",
        source: "कुरान 2:255",
      },
      ur: {
        title: "آیت الکرسی",
        description: "اللہ کی کتاب کا سب سے عظیم آیت",
        content:
          "اللہ - اس کے علاوہ کوئی معبود نہیں ہے، ہمیشہ زندہ رہنے والا، وجود کو قائم رکھنے والا۔ نہ تو نیند اسے چھوتی ہے اور نہ ہی نیند۔",
        source: "قرآن 2:255",
      },
    },
  },
];

// Sample Hadith content
export const hadithContent: LocalizedContent[] = [
  {
    id: "hadith-charity",
    type: "hadith",
    defaultLanguage: "ar",
    languages: {
      ar: {
        title: "حديث الصدقة",
        description: "من أعظم الأحاديث النبوية",
        content:
          "قال رسول الله صلى الله عليه وسلم: من تصدق بعدل تمرة من كسب طيب، والله لا يقبل إلا الطيب، فإن الله يتقبلها بيمينه ثم يربيها لصاحبه كما يربي أحدكم فلوه حتى تكون مثل الجبل",
        author: "Prophet Muhammad (PBUH)",
        source: "Sahih Bukhari",
      },
      en: {
        title: "Hadith on Charity",
        description: "One of the Greatest Prophetic Traditions",
        content:
          "The Messenger of Allah (PBUH) said: Whoever gives charity equal to a date from lawful earnings - and Allah only accepts lawful things - Allah accepts it with His right hand and nurtures it for its owner as one of you nurtures his colt until it becomes as large as a mountain.",
        author: "Prophet Muhammad (PBUH)",
        source: "Sahih Bukhari",
      },
      hi: {
        title: "दान की हदीस",
        description: "सबसे महान पैगंबर परंपराओं में से एक",
        content:
          "अल्लाह के दूत (PBUH) ने कहा: जो कोई ईमानदारी से कमाई से एक खजूर के बराबर दान देता है, अल्लाह केवल जायज चीजें स्वीकार करता है, अल्लाह इसे अपने दाहिने हाथ से स्वीकार करता है और इसके मालिक के लिए इसे बढ़ाता है।",
        author: "पैगंबर मुहम्मद (PBUH)",
        source: "सहीह अल-बुखारी",
      },
      ur: {
        title: "صدقہ کی حدیث",
        description: "سب سے عظیم پیغمبری روایات میں سے ایک",
        content:
          "اللہ کے رسول (PBUH) نے فرمایا: جو شخص حلال کمائی سے ایک کھجور کے برابر صدقہ دیتا ہے - اور اللہ صرف حلال چیزیں قبول کرتا ہے - اللہ اسے اپنے دائیں ہاتھ سے قبول کرتا ہے اور اس کے مالک کے لیے اسے پروان چڑھاتا ہے۔",
        author: "نبی محمد (PBUH)",
        source: "صحیح البخاری",
      },
    },
  },
];

// Sample Lecture content
export const lectureContent: LocalizedContent[] = [
  {
    id: "lecture-islam-science",
    type: "lecture",
    defaultLanguage: "en",
    languages: {
      en: {
        title: "Understanding Islam and Science",
        description:
          "A comprehensive lecture on how Islamic teachings complement modern scientific understanding",
        content:
          "This lecture explores the harmony between Islamic teachings and modern science. We will discuss how the Quran mentions scientific facts discovered centuries later, the role of Muslim scholars in advancing mathematics, astronomy, and medicine, and how Islam encourages the pursuit of knowledge.",
        author: "Islamic Scholar",
        source: "Educational Series",
      },
      ar: {
        title: "فهم الإسلام والعلم",
        description: "محاضرة شاملة حول كيفية تكامل التعاليم الإسلامية مع العلم الحديث",
        content:
          "تستكشف هذه المحاضرة التوافق بين التعاليم الإسلامية والعلم الحديث. سنناقش كيفة أن القرآن يذكر حقائق علمية اكتشفت بعد قرون، ودور العلماء المسلمين في تقدم الرياضيات والفلك والطب، وكيف يشجع الإسلام على طلب العلم.",
        author: "عالم إسلامي",
        source: "السلسلة التعليمية",
      },
      hi: {
        title: "इस्लाम और विज्ञान को समझना",
        description:
          "कैसे इस्लामिक शिक्षाएं आधुनिक वैज्ञानिक समझ के साथ पूरक हैं, इस पर एक व्यापक व्याख्यान",
        content:
          "यह व्याख्यान इस्लामिक शिक्षाओं और आधुनिक विज्ञान के बीच सामंजस्य की खोज करता है। हम चर्चा करेंगे कि कैसे कुरान वैज्ञानिक तथ्य देता है जो सदियों बाद खोजे गए, मुस्लिम विद्वानों की गणित, खगोल विज्ञान और दवा को आगे बढ़ाने में भूमिका, और कैसे इस्लाम ज्ञान की खोज को प्रोत्साहित करता है।",
        author: "इस्लामिक विद्वान",
        source: "शैक्षिक श्रृंखला",
      },
      ur: {
        title: "اسلام اور سائنس کو سمجھنا",
        description:
          "ایک جامع لیکچر جس میں اسلامی تعلیمات اور جدید سائنسی سمجھ میں تال میل کی وضاحت کی جائے",
        content:
          "یہ لیکچر اسلامی تعلیمات اور جدید سائنس کے درمیان ہم آہنگی کی تلاش کرتا ہے۔ ہم بات کریں گے کہ کیسے قرآن ایسے سائنسی حقائق بیان کرتا ہے جو صدیوں بعد دریافت ہوئے، مسلم علماء کی ریاضیات، فلکیات اور دوا میں ترقی میں کردار، اور کیسے اسلام علم کی تلاش کی حوصلہ افزائی کرتا ہے۔",
        author: "اسلامی عالم",
        source: "تعلیمی سلسلہ",
      },
    },
  },
];

// Get content by ID and language
export function getContent(
  id: string,
  language: string,
  dialect?: string
): ContentTranslation | null {
  const allContent = [...quranContent, ...hadithContent, ...lectureContent];
  const content = allContent.find((c) => c.id === id);

  if (!content) return null;

  // Try to get the requested language
  let translation = content.languages[language];
  if (!translation) {
    // Fall back to default language
    translation = content.languages[content.defaultLanguage];
  }

  if (!translation) return null;

  // If dialect is requested, try to get dialect variant
  if (dialect && translation.dialects && translation.dialects[dialect]) {
    return {
      ...translation,
      ...translation.dialects[dialect],
    };
  }

  return translation;
}

// Get all available languages for a content
export function getAvailableLanguages(id: string): string[] {
  const allContent = [...quranContent, ...hadithContent, ...lectureContent];
  const content = allContent.find((c) => c.id === id);
  return content ? Object.keys(content.languages) : [];
}

// Get all dialects for a specific language
export function getAvailableDialects(
  id: string,
  language: string
): string[] {
  const allContent = [...quranContent, ...hadithContent, ...lectureContent];
  const content = allContent.find((c) => c.id === id);

  if (!content) return [];

  const translation = content.languages[language];
  if (!translation || !translation.dialects) return [];

  return Object.keys(translation.dialects);
}

// Get featured content for homepage
export function getFeaturedContent(language: string): LocalizedContent[] {
  return [
    quranContent[0], // Surah Yasin
    hadithContent[0], // Hadith on Charity
    lectureContent[0], // Islam and Science
  ];
}
