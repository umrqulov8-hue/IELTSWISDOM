"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Book, FileText, ChevronDown, BookOpen, Star, Flame, ArrowRight, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { BouncyText } from "@/components/ui/BouncyText";

// --- Types ---
interface Passage {
    id: string;
    title: string;
}

interface Test {
    id: string;
    title: string;
    passages: Passage[];
}

interface BookData {
    id: string;
    title: string;
    badge?: string;
    tests: Test[];
}

// --- Mock Data ---
const BOOKS: BookData[] = [
    {
        id: "cam-20",
        title: "Cambridge IELTS 20",
        badge: "HOT",
        tests: [
            {
                id: "c20-t1",
                title: "Test 1",
                passages: [
                    { id: "c20-t1-p1", title: "The Evolution of Urban Design" },
                    { id: "c20-t1-p2", title: "Microplastics in the Global Ocean" },
                    { id: "c20-t1-p3", title: "The Psychology of Boredom" },
                ]
            },
            {
                id: "c20-t2",
                title: "Test 2",
                passages: [
                    { id: "c20-t2-p1", title: "Ancient Civilizations of Peru" },
                    { id: "c20-t2-p2", title: "Artificial Intelligence in Medicine" },
                    { id: "c20-t2-p3", title: "Rewilding the Scottish Highlands" },
                ]
            },
            {
                id: "c20-t3",
                title: "Test 3",
                passages: [
                    { id: "c20-t3-p1", title: "The History of Cryptography" },
                    { id: "c20-t3-p2", title: "Sustainable Fashion Trends" },
                    { id: "c20-t3-p3", title: "Exploring the Deep Sea" },
                ]
            },
            {
                id: "c20-t4",
                title: "Test 4",
                passages: [
                    { id: "c20-t4-p1", title: "The Future of Space Tourism" },
                    { id: "c20-t4-p2", title: "Cognitive Benefits of Bilingualism" },
                    { id: "c20-t4-p3", title: "Renewable Energy Solutions" },
                ]
            }
        ]
    },
    {
        id: "cam-19",
        title: "Cambridge IELTS 19",
        badge: "NEW",
        tests: [
            {
                id: "c19-t1",
                title: "Test 1",
                passages: [
                    { id: "c19-t1-p1", title: "The Development of Museums" },
                    { id: "c19-t1-p2", title: "The Future of Work" },
                    { id: "c19-t1-p3", title: "Urban Planning in Singapore" },
                ]
            },
            {
                id: "c19-t2",
                title: "Test 2",
                passages: [
                    { id: "c19-t2-p1", title: "History of Tea" },
                    { id: "c19-t2-p2", title: "The Global Water Crisis" },
                    { id: "c19-t2-p3", title: "Understanding Human Memory" },
                ]
            },
            {
                id: "c19-t3",
                title: "Test 3",
                passages: [
                    { id: "c19-t3-p1", title: "The Rise of E-Sports" },
                    { id: "c19-t3-p2", title: "Climate Change Adaptation" },
                    { id: "c19-t3-p3", title: "The Science of Sleep" },
                ]
            },
            {
                id: "c19-t4",
                title: "Test 4",
                passages: [
                    { id: "c19-t4-p1", title: "Ocean Acidification" },
                    { id: "c19-t4-p2", title: "Digital Nomads" },
                    { id: "c19-t4-p3", title: "The Art of Storytelling" },
                ]
            }
        ]
    },
    {
        id: "cam-18",
        title: "Cambridge IELTS 18",
        tests: [
            {
                id: "c18-t1",
                title: "Test 1",
                passages: [
                    { id: "c18-t1-p1", title: "Urban Farming" },
                    { id: "c18-t1-p2", title: "Forest Management" },
                    { id: "c18-t1-p3", title: "Cognitive Dissonance" },
                ]
            },
            {
                id: "c18-t2",
                title: "Test 2",
                passages: [
                    { id: "c18-t2-p1", title: "Stonehenge Builders" },
                    { id: "c18-t2-p2", title: "Living with Artificial Intelligence" },
                    { id: "c18-t2-p3", title: "An Ideal City" },
                ]
            },
            {
                id: "c18-t3",
                title: "Test 3",
                passages: [
                    { id: "c18-t3-p1", title: "Materials for Future Construction" },
                    { id: "c18-t3-p2", title: "The Steam Car" },
                    { id: "c18-t3-p3", title: "Retirement in a Changing World" },
                ]
            },
            {
                id: "c18-t4",
                title: "Test 4",
                passages: [
                    { id: "c18-t4-p1", title: "Green Roofs" },
                    { id: "c18-t4-p2", title: "The Growth of Bike-Sharing Schemes" },
                    { id: "c18-t4-p3", title: "Alfred Wegener and Continental Drift" },
                ]
            }
        ]
    },
    {
        id: "cam-17",
        title: "Cambridge IELTS 17",
        tests: [
            {
                id: "c17-t1",
                title: "Test 1",
                passages: [
                    { id: "c17-t1-p1", title: "The Development of the London Underground" },
                    { id: "c17-t1-p2", title: "Stadiums: Past, Present and Future" },
                    { id: "c17-t1-p3", title: "To Catch a King" },
                ]
            },
            {
                id: "c17-t2",
                title: "Test 2",
                passages: [
                    { id: "c17-t2-p1", title: "The Dead Sea Scrolls" },
                    { id: "c17-t2-p2", title: "A Second Look at Twin Studies" },
                    { id: "c17-t2-p3", title: "What is Exploration?" },
                ]
            },
            {
                id: "c17-t3",
                title: "Test 3",
                passages: [
                    { id: "c17-t3-p1", title: "The Thylacine" },
                    { id: "c17-t3-p2", title: "Palm Oil" },
                    { id: "c17-t3-p3", title: "Building the Skyline: The Birth and Growth of Manhattan's Skyscrapers" },
                ]
            },
            {
                id: "c17-t4",
                title: "Test 4",
                passages: [
                    { id: "c17-t4-p1", title: "Bats to the Rescue" },
                    { id: "c17-t4-p2", title: "Timur Gareyev - Blindfold Chess Champion" },
                    { id: "c17-t4-p3", title: "The Levantine Viper" },
                ]
            }
        ]
    },
    {
        id: "trainer-2",
        title: "IELTS Trainer 2",
        tests: [
            {
                id: "tr2-t1",
                title: "Test 1",
                passages: [
                    { id: "tr2-t1-p1", title: "The History of Glass" },
                    { id: "tr2-t1-p2", title: "Bring Back the Big Cats" },
                    { id: "tr2-t1-p3", title: "The Desolenator: Producing Clean Water" }
                ]
            },
            {
                id: "tr2-t2",
                title: "Test 2",
                passages: [
                    { id: "tr2-t2-p1", title: "Why We Need to Protect Polar Bears" },
                    { id: "tr2-t2-p2", title: "The Step Pyramid of Djoser" },
                    { id: "tr2-t2-p3", title: "The Future of Management" }
                ]
            },
            {
                id: "tr2-t3",
                title: "Test 3",
                passages: [
                    { id: "tr2-t3-p1", title: "Plant Thermometer Triggers Springtime Growth" },
                    { id: "tr2-t3-p2", title: "The Innovation of Grocery Stores" },
                    { id: "tr2-t3-p3", title: "Placebo Effect: The Power of Nothing" }
                ]
            },
            {
                id: "tr2-t4",
                title: "Test 4",
                passages: [
                    { id: "tr2-t4-p1", title: "The Return of the Huia" },
                    { id: "tr2-t4-p2", title: "How to Spot a Liar" },
                    { id: "tr2-t4-p3", title: "Being Borne" }
                ]
            },
            {
                id: "tr2-t5",
                title: "Test 5",
                passages: [
                    { id: "tr2-t5-p1", title: "The Dover Bronze Age Boat" },
                    { id: "tr2-t5-p2", title: "The Changing Role of Airports" },
                    { id: "tr2-t5-p3", title: "Is Photography Art?" }
                ]
            },
            {
                id: "tr2-t6",
                title: "Test 6",
                passages: [
                    { id: "tr2-t6-p1", title: "The Concept of Intelligence" },
                    { id: "tr2-t6-p2", title: "Saving the Soil" },
                    { id: "tr2-t6-p3", title: "Book Review: The Happiness Industry" }
                ]
            }
        ]
    },
    {
        id: "4000-1",
        title: "4000 Essential English Words Book 1",
        tests: [
            {
                id: "4000-1-u1",
                title: "Unit 1",
                passages: [
                    { id: "4000-1-u1-p1", title: "The Lion and the Rabbit" }
                ]
            },
            {
                id: "4000-1-u2",
                title: "Unit 2",
                passages: [
                    { id: "4000-1-u2-p1", title: "The Laboratory" }
                ]
            }
        ]
    },
    {
        id: "4000-2",
        title: "4000 Essential English Words Book 2",
        tests: [
            {
                id: "4000-2-u1",
                title: "Unit 1",
                passages: [
                    { id: "4000-2-u1-p1", title: "The Feathery Friend" }
                ]
            }
        ]
    },
    {
        id: "dest-c1-c2",
        title: "Destination C1-C2",
        tests: [
            {
                id: "dest-test-1",
                title: "Unit 1",
                passages: [
                    { id: "dest-test-1-p1", title: "Present Tenses" }
                ]
            },
            {
                id: "dest-test-2",
                title: "Unit 2",
                passages: [
                    { id: "dest-test-2-p1", title: "Review of Present Tenses" }
                ]
            },
            {
                id: "dest-test-3",
                title: "Unit 3",
                passages: [
                    { id: "dest-test-3-p1", title: "Past Tenses" }
                ]
            },
            {
                id: "dest-test-4",
                title: "Unit 4",
                passages: [
                    { id: "dest-test-4-p1", title: "Review of Past Tenses" }
                ]
            },
            {
                id: "dest-test-5",
                title: "Unit 5",
                passages: [
                    { id: "dest-test-5-p1", title: "Review of Grammar" }
                ]
            }
        ]
    },
    {
        id: "vocab-adv",
        title: "Vocabulary For IELTS Advanced",
        tests: [
            {
                id: "vocab-adv-u1",
                title: "Unit 1: Human Nature",
                passages: [
                    { id: "vocab-adv-u1-p1", title: "Character and Personality" },
                    { id: "vocab-adv-u1-p2", title: "Human Relationships" }
                ]
            },
            {
                id: "vocab-adv-u2",
                title: "Unit 2: Time for a Change",
                passages: [
                    { id: "vocab-adv-u2-p1", title: "History and Progress" },
                    { id: "vocab-adv-u2-p2", title: "Lifestyle Changes" }
                ]
            },
            {
                id: "vocab-adv-u3",
                title: "Unit 3: No Place Like Home",
                passages: [
                    { id: "vocab-adv-u3-p1", title: "Housing and Accommodation" },
                    { id: "vocab-adv-u3-p2", title: "Buildings and Architecture" }
                ]
            },
            {
                id: "vocab-adv-u4",
                title: "Unit 4: Travel and Transport",
                passages: [
                    { id: "vocab-adv-u4-p1", title: "Modern Transportation" },
                    { id: "vocab-adv-u4-p2", title: "Tourism Impacts" }
                ]
            },
            {
                id: "vocab-adv-u5",
                title: "Unit 5: Work and Business",
                passages: [
                    { id: "vocab-adv-u5-p1", title: "Employment Trends" },
                    { id: "vocab-adv-u5-p2", title: "Corporate Culture" }
                ]
            }
        ]
    }
];

import { ActivitySelectionModal } from "@/components/dashboard/ActivitySelectionModal";

// ... [Keep existing types and data] ...

export default function VocabularyPage() {
    const { lang } = useLanguage();
    const selectBook = lang === "en" ? "Select a Book" : "Kitobni tanlang";
    const booksLabel = lang === "en" ? "Books Available" : "Mavjud kitoblar";
    const testsLabel = lang === "en" ? "Total Tests" : "Jami testlar";
    const passagesLabel = lang === "en" ? "Passages" : "Matnlar";
    const startActivities = lang === "en" ? "Start Activities" : "Mashqlarni boshlash";
    const testsWord = lang === "en" ? "Tests" : "Testlar";
    const [expandedBook, setExpandedBook] = useState<string | null>("cam-20");
    // State to track expanded tests within books (Accordion Level 2)
    // Map of bookId -> expandedTestId
    const [expandedTests, setExpandedTests] = useState<Record<string, string | null>>({ "cam-20": "c20-t1" });

    // Modal State
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [selectedActivityData, setSelectedActivityData] = useState<{
        bookTitle: string;
        testTitle: string;
        passageTitle: string;
        passageId: string;
    } | null>(null);

    const toggleTest = (bookId: string, testId: string) => {
        setExpandedTests(prev => ({
            ...prev,
            [bookId]: prev[bookId] === testId ? null : testId
        }));
    };

    const handleStartActivity = (bookTitle: string, testTitle: string, passage: Passage) => {
        setSelectedActivityData({
            bookTitle,
            testTitle,
            passageTitle: passage.title,
            passageId: passage.id
        });
        setIsActivityModalOpen(true);
    };

    return (
        <DashboardLayout
            title={lang === "en" ? "Vocabulary Practice" : "Lug'at Mashqi"}
            description={lang === "en" ? "Master IELTS vocabulary with context-based passage practice." : "Kontekstga asoslangan matn mashqlari bilan IELTS lug'atini o'zlang."}
        >
            {/* Header Stats */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
                <StatsCard icon={Book} label={booksLabel} value="13" color="text-blue-700" bg="bg-blue-50" />
                <StatsCard icon={FileText} label={testsLabel} value="20+" color="text-purple-700" bg="bg-purple-50" />
                <StatsCard icon={BookOpen} label={passagesLabel} value="60+" color="text-emerald-700" bg="bg-emerald-50" />
            </motion.div>

            {/* Main Content Card - Liquid Glass */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.3 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
            >
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                    <span className="w-1 h-8 bg-[#D4AF37] rounded-full inline-block"></span>
                    <BouncyText key={`sb-${lang}`} text={selectBook} type="word" />
                </h2>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
                    }}
                    className="space-y-4"
                >
                    {BOOKS.map((book) => (
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
                            }}
                            key={book.id}
                            className="group"
                        >
                            {/* Book Header */}
                            <motion.button
                                onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                                className={cn(
                                    "w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 border border-transparent",
                                    expandedBook === book.id
                                        ? "bg-red-50 shadow-sm border-red-100/50" // Light red tint when active (matching screenshot vibe)
                                        : "bg-white/40 hover:bg-white hover:shadow-sm"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                                        expandedBook === book.id ? "bg-[#D4AF37] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-[#F59E0B]/10 group-hover:text-[#F59E0B]"
                                    )}>
                                        <Book className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className={cn(
                                            "text-lg font-bold transition-colors",
                                            expandedBook === book.id ? "text-[#1A1A1A]" : "text-slate-700"
                                        )}>
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-slate-600 font-medium">
                                            {book.tests.length} {testsWord}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {book.badge && (
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider animate-pulse",
                                            book.badge === "NEW" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-red-600"
                                        )}>
                                            {book.badge} {book.badge === "HOT" && <Flame className="w-3 h-3 inline ml-1" />}
                                        </span>
                                    )}
                                    <ChevronDown className={cn(
                                        "w-5 h-5 text-slate-600 transition-transform duration-300",
                                        expandedBook === book.id ? "rotate-180 text-red-500" : "" // Red chevron when active
                                    )} />
                                </div>
                            </motion.button>

                            {/* Tests Accordion (Nested) */}
                            <AnimatePresence>
                                {expandedBook === book.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-2 pb-4 space-y-2">
                                            {book.tests.map((test) => {
                                                const isTestExpanded = expandedTests[book.id] === test.id;
                                                return (
                                                    <div key={test.id} className="rounded-xl overflow-hidden border border-slate-100">
                                                        {/* Test Header */}
                                                        <button
                                                            onClick={() => toggleTest(book.id, test.id)}
                                                            className={cn(
                                                                "w-full flex items-center justify-between px-6 py-4 transition-colors",
                                                                isTestExpanded ? "bg-slate-50" : "bg-white hover:bg-slate-50"
                                                            )}
                                                        >
                                                            <span className="font-semibold text-slate-700">{test.title}</span>
                                                            <ChevronDown className={cn(
                                                                "w-4 h-4 text-slate-600 transition-transform duration-200",
                                                                isTestExpanded ? "rotate-180 text-sky-500" : ""
                                                            )} />
                                                        </button>

                                                        {/* Passages List (Level 3) */}
                                                        <AnimatePresence>
                                                            {isTestExpanded && (
                                                                <motion.div
                                                                    initial={{ height: 0 }}
                                                                    animate={{ height: "auto" }}
                                                                    exit={{ height: 0 }}
                                                                    className="bg-white"
                                                                >
                                                                    <div className="px-6 py-2 space-y-1">
                                                                        {test.passages.map((passage) => (
                                                                            <div key={passage.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-2 px-2 rounded-lg transition-colors">
                                                                                <span className="text-slate-600 font-medium">
                                                                                    {passage.title}
                                                                                </span>
                                                                                <button
                                                                                    onClick={() => handleStartActivity(book.title, test.title, passage)}
                                                                                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors group/btn"
                                                                                >
                                                                                    {startActivities}
                                                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Activity Selection Modal */}
            <ActivitySelectionModal
                isOpen={isActivityModalOpen}
                onClose={() => setIsActivityModalOpen(false)}
                data={selectedActivityData}
            />
        </DashboardLayout>
    );
}


function StatsCard({ icon: Icon, label, value, color, bg }: { icon: any, label: string, value: string, color: string, bg: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.5 } }
            }}
            className="bg-white/60 backdrop-blur-md border border-white/50 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className={cn("p-3 rounded-xl transform transition-transform group-hover:scale-110", bg, color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-2xl font-bold text-[#1A1A1A]">{value}</h4>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
            </div>
        </motion.div>
    );
}
