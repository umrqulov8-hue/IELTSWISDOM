"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
    const { lang } = useLanguage();

    const content = {
        en: {
            back: "Back to Home",
            title: "Legal Information",
            subtitle: "Terms of Use, Privacy Policy, and Copyright Notice",
            intro: "Welcome to our website. By accessing and using this platform, you agree to the terms and policies described below. Please read this information carefully.",
            sections: [
                {
                    title: "1. Purpose of the Website",
                    paragraphs: [
                        "This website is created to help students improve their English skills and prepare for the IELTS examination. The platform provides practice materials, exercises, and learning resources intended solely for educational and informational purposes.",
                        "Our goal is to make learning more accessible by organizing useful materials in one convenient place for students who want to practice and improve their IELTS performance."
                    ]
                },
                {
                    title: "2. Educational Use Disclaimer",
                    paragraphs: [
                        "The materials available on this website are provided strictly for educational and practice purposes. Some resources may be compiled from publicly available sources across the internet and are shared to support learning and exam preparation.",
                        "We do not claim ownership of all materials unless explicitly stated. All copyrights and intellectual property rights belong to their respective owners.",
                        "If you are the copyright owner of any content displayed on this website and believe that your material has been used inappropriately, please contact us. We will review the request and, if necessary, remove the content promptly."
                    ]
                },
                {
                    title: "3. User Responsibility",
                    paragraphs: [
                        "Users agree to use this website responsibly and only for lawful purposes. Any attempt to misuse the platform, distribute harmful content, interfere with the functionality of the website, or exploit the system is strictly prohibited.",
                        "We reserve the right to restrict or terminate access to users who violate these rules."
                    ]
                },
                {
                    title: "4. Privacy Policy",
                    paragraphs: [
                        "We respect the privacy of our users. Any personal information collected through this website, such as during registration or account creation, is used solely to improve the user experience and provide access to the platform's services.",
                        "We do not sell, trade, or share users' personal information with third parties unless required by law or necessary to operate essential website services.",
                        "Basic data such as login information, usage statistics, and system logs may be collected to maintain security, improve performance, and enhance the overall functionality of the platform."
                    ]
                },
                {
                    title: "5. Third-Party Services",
                    paragraphs: [
                        "This website may use third-party tools, services, or APIs to provide additional functionality, such as speech recognition, artificial intelligence analysis, or hosting services. These services may process limited data as required to perform their functions.",
                        "By using this website, you acknowledge that such services may be involved in delivering certain features."
                    ]
                },
                {
                    title: "6. Limitation of Liability",
                    paragraphs: [
                        "While we aim to provide accurate and helpful educational materials, we cannot guarantee that all information on the website is completely error-free or perfectly aligned with official IELTS examination standards.",
                        "Users should treat the resources as supplementary learning materials and not as official IELTS content."
                    ]
                },
                {
                    title: "7. Changes to This Policy",
                    paragraphs: [
                        "We may update or modify these terms and policies at any time to improve the website or comply with legal requirements. Continued use of the website after changes are made indicates acceptance of the updated policies."
                    ]
                },
                {
                    title: "8. Contact",
                    paragraphs: [
                        "If you have any questions, concerns, or copyright requests regarding the materials on this website, please contact us through the website's contact page."
                    ]
                }
            ],
            footer: "Thank you for using our platform and being part of the learning community."
        },
        uz: {
            back: "Bosh sahifaga qaytish",
            title: "Huquqiy ma'lumotlar",
            subtitle: "Foydalanish shartlari, Maxfiylik siyosati va Mualliflik huquqi",
            intro: "Veb-saytimizga xush kelibsiz. Ushbu platformaga kirish va undan foydalanish orqali siz quyida keltirilgan shartlar va siyosatlarga rozilik bildirasiz. Iltimos, ushbu ma'lumotlarni diqqat bilan o'qib chiqing.",
            sections: [
                {
                    title: "1. Veb-saytning maqsadi",
                    paragraphs: [
                        "Ushbu veb-sayt talabalarga ingliz tili ko'nikmalarini oshirish va IELTS imtihoniga tayyorgarlik ko'rishda yordam berish maqsadida yaratilgan. Platforma faqat ta'lim va ma'lumot berish maqsadlarida mo'ljallangan amaliy materiallar, mashqlar va o'quv manbalarini taqdim etadi.",
                        "Bizning maqsadimiz IELTS natijalarini yaxshilashni xohlovchi talabalar uchun foydali materiallarni bitta qulay joyda jamlash orqali o'rganishni yanada osonlashtirishdir."
                    ]
                },
                {
                    title: "2. Ta'lim maqsadida foydalanish",
                    paragraphs: [
                        "Ushbu veb-saytda mavjud bo'lgan materiallar qat'iy ravishda ta'lim va amaliyot maqsadlarida taqdim etiladi. Ba'zi manbalar internetdagi hamma uchun ochiq manbalardan to'plangan bo'lishi mumkin va ular o'rganish va imtihonga tayyorgarlikni qo'llab-quvvatlash uchun ulashilgan.",
                        "Agar alohida ko'rsatilmagan bo'lsa, biz barcha materiallarga egalik huquqini da'vo qilmaymiz. Barcha mualliflik huquqlari va intellektual mulk huquqlari tegishli egalariga tegishli.",
                        "Agar siz ushbu veb-saytda ko'rsatilgan har qanday tarkibning mualliflik huquqi egasi bo'lsangiz va materialingiz noto'g'ri ishlatilgan deb hisoblasangiz, iltimos, biz bilan bog'laning. Biz so'rovni ko'rib chiqamiz va agar kerak bo'lsa, kontentni tezda olib tashlaymiz."
                    ]
                },
                {
                    title: "3. Foydalanuvchi javobgarligi",
                    paragraphs: [
                        "Foydalanuvchilar ushbu veb-saytdan mas'uliyat bilan va faqat qonuniy maqsadlarda foydalanishga rozi bo'ladilar. Platformani suiiste'mol qilish, zararli tarkibni tarqatish, veb-sayt ishlashiga xalaqit berish yoki tizimdan nojo'ya maqsadlarda foydalanishga qaratilgan har qanday urinish qat'iyan man etiladi.",
                        "Biz ushbu qoidalarni buzgan foydalanuvchilarning kirishini cheklash yoki to'xtatish huquqini o'zida saqlab qolamiz."
                    ]
                },
                {
                    title: "4. Maxfiylik siyosati",
                    paragraphs: [
                        "Biz foydalanuvchilarimizning shaxsiy hayotini hurmat qilamiz. Ushbu veb-sayt orqali to'plangan har qanday shaxsiy ma'lumotlar, masalan, ro'yxatdan o'tish yoki hisob yaratish paytida, faqat foydalanuvchi tajribasini yaxshilash va platforma xizmatlaridan foydalanishni ta'minlash uchun ishlatiladi.",
                        "Qonun bo'yicha yoki asosiy veb-sayt xizmatlarini ko'rsatish uchun zarur bo'lmagan hollarda, biz foydalanuvchilarning shaxsiy ma'lumotlarini sotmaymiz, savdoga qo'ymaymiz yoki uchinchi shaxslar bilan baham ko'rmaymiz.",
                        "Kirish ma'lumotlari, foydalanish statistikasi va tizim jurnallari kabi asosiy ma'lumotlar xavfsizlikni saqlash, ishlashni yaxshilash va platformaning umumiy funksiyasini oshirish uchun to'planishi mumkin."
                    ]
                },
                {
                    title: "5. Uchinchi tomon xizmatlari",
                    paragraphs: [
                        "Ushbu veb-sayt nutqni aniqlash, sun'iy intellekt tahlili yoki xosting xizmatlari kabi qo'shimcha funksiyalarni taqdim etish uchun uchinchi tomon vositalari, xizmatlari yoki API-laridan foydalanishi mumkin. Ushbu xizmatlar o'z funksiyalarini bajarish uchun zarur bo'lgan cheklangan ma'lumotlarni qayta ishlashi mumkin.",
                        "Ushbu veb-saytdan foydalanish orqali siz ma'lum xususiyatlarni taqdim etishda bunday xizmatlar ishtirok etishi mumkinligini tan olasiz."
                    ]
                },
                {
                    title: "6. Javobgarlikni cheklash",
                    paragraphs: [
                        "Biz aniq va foydali ta'lim materiallarini taqdim etishga harakat qilsak-da, veb-saytdagi barcha ma'lumotlar to'liq xatosiz ekanligiga yoki rasmiy IELTS imtihon standartlariga to'liq mos kelishiga kafolat bera olmaymiz.",
                        "Foydalanuvchilar manbalarga rasmiy IELTS materiali sifatida emas, balki qo'shimcha o'quv materiallari sifatida qarashlari kerak."
                    ]
                },
                {
                    title: "7. Ushbu siyosatga o'zgartirishlar",
                    paragraphs: [
                        "Biz veb-saytni yaxshilash yoki qonuniy talablarga javob berish uchun istalgan vaqtda ushbu shartlar va siyosatlarni yangilashimiz yoki o'zgartirishimiz mumkin. O'zgartirishlar kiritilgandan so'ng veb-saytdan foydalanishni davom ettirish yangilangan siyosatlarni qabul qilishni anglatadi."
                    ]
                },
                {
                    title: "8. Aloqa",
                    paragraphs: [
                        "Agar ushbu veb-saytdagi materiallar bilan bog'liq har qanday savollaringiz, xavotirlaringiz yoki mualliflik huquqi bo'yicha so'rovlaringiz bo'lsa, iltimos, veb-saytning aloqa sahifasi orqali biz bilan bog'laning."
                    ]
                }
            ],
            footer: "Platformamizdan foydalanganingiz va talabalar hamjamiyatining bir qismi bo'lganingiz uchun tashakkur."
        }
    };

    const t = content[lang as keyof typeof content] || content.en;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> {t.back}
                </Link>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                        {t.title}
                        <span className="text-slate-500 dark:text-slate-400 font-normal block text-xl mt-3">{t.subtitle}</span>
                    </h1>

                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-8">
                        <p className="text-lg leading-relaxed">
                            {t.intro}
                        </p>

                        {t.sections.map((section, index) => (
                            <section key={index} className="space-y-3">
                                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">{section.title}</h2>
                                {section.paragraphs.map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </section>
                        ))}

                        <section className="space-y-3">
                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-sm font-medium">
                                <p>{t.footer}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
