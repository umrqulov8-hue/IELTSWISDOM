"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, PenTool, Search, Star, FileText, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
interface SampleItem {
    id: string;
    title: string;
    band: string;
    wordCount: number;
    type: "essay" | "report";
    content?: string;
    imageUrl?: string;
}

// --- Mock Data ---
const SAMPLES: SampleItem[] = [
    {
        id: "new-1",
        title: "Average house prices between 1997 and 2014",
        band: "9.0",
        wordCount: 194,
        type: "report",
        imageUrl: "/images/samples/house-prices-graph.png", // Placeholder for now
        content: `
            <p>The line chart details how house prices in three countries changed between 1997 and 2014. In general, all three countries saw overall upward trends, albeit to varying degrees, with some marked fluctuations over the period in question. It is also clear that houses in Country A appreciated in value at a faster rate while those in Country C remained the cheapest for the entire period.</p>
            <p>A house in Country A and Country B cost nearly the same amount in 1997, at around 200,000 dollars. Both nations had seen the prices increase gradually by 2002, when the price tags hit 250,000 dollars. A house in Country A more than doubled in value for the next two years while the one in Country B increased slightly to 300,000. Since then, however, the numbers had fallen marginally by 2008 before going up again. Country A showed a slightly unsteady growth, finishing the period at 750,000 dollars whereas Country B witnessed house prices double to 500,000 dollars until 2009, after which the figure almost remained steady for the rest of the timeframe.</p>
            <p>Country C, in contrast, exhibited slightly different patterns. Starting the period at well under 200,000, the figure for the country rose steadily until 2007 and reached 250,000 dollars. It then, however, dipped to its initial point in a year before recovering a year later and showing only a negligible rise by 2014.</p>
        `
    },
    {
        id: "new-2",
        title: "Male and Female Housework Participation",
        band: "9.0",
        wordCount: 200, // Approx
        type: "report",
        content: `
            <p>The bar charts compare the percentages of men and women in a country who engaged in four types house chores and the amount of time they spent on those tasks a day.</p>
            <p>Overall, more women do the cooking and cleaning, and invest more time in doing so than men while men are more active in maintenance work. It is also clear the genders exhibited almost identical patterns in pet care in both charts.</p>
            <p>Starting with the proportions of males and females involved in household duties, women show greater numbers in two tasks – cooking (just above 80%) and cleaning (just over 60%), as opposed to men standing (60% and 40% respectively). As for repair work around the house, however, the figure for men more than doubles the one for women (nearly 20% vs 8%). Finally, the percentages for pet care are the nearly the same for men and women, at 20%.</p>
            <p>Similar patterns can be observed in the amount of time allocated for the duties. It is obvious that women spend far more time on cooking and cleaning, at 85 minutes and almost 70 minutes a day respectively while men need an hour for the former and 45 minutes for the latter. By contrast, men spend around 20 minutes on house repairs, far more than the 8 minutes spent by women. Finally, both genders devoted 20 minutes to looking after a pet.</p>
        `
    },
    {
        id: "new-3",
        title: "Reasons for Choosing a University (1987 vs 2007)",
        band: "9.0",
        wordCount: 220, // Approx
        type: "report",
        content: `
            <p>The pie charts compare the reasons for students opting for a college or university in the UK for the years 1987 and 2007. Overall, students seeking higher education in the UK to study relevant majors accounted for the largest shares in both years. It is also clear that in 1997, staying close to parents was the least popular reason while in 2007, the lowest percentage was driven by fitness and social life in the UK, with these two motives showing the most noticeable changes.</p>
            <p>Starting with the least notable changes, in 1987, suitable degree courses were the primary motive for 35% of students, loosely followed by the reason of good resources, at 21%. While the former had risen by just 3%, the latter had dropped by a similar amount of 4% by 2007. Similarly, those who emphasized the quality of teaching the most went from 15% in 1987 to 18% in 2007.</p>
            <p>Moving onto the shares showing the most noticeable discrepancies, the reason of staying close to parents accounted for 10% in 1987, but it more than doubled to 22% after 20 years. By contrast, to enjoy sports and social life, 19% of students opted for UK higher education, this number nosediving to 6% in 2007.</p>
        `
    },
    {
        id: "new-4",
        title: "Electricity Production Sources (2003-2008)",
        band: "9.0",
        wordCount: 210, // Approx
        type: "report",
        content: `
            <p>The charts compare four countries in terms of their reliance on three electricity sources between 2003 and 2008. Overall, in two countries – India and Vietnam – the majority of electricity was generated using fossil fuels while Sweden and Morocco mostly relied on hydropower, with the figure for Morocco being much higher. As for nuclear use for electricity, there was no record of it in Morocco and Vietnam although Sweden’s reliance on this source was significantly high.</p>
            <p>Turning to fossil fuels which was the dominant source for electricity production in India and Vietnam, the former generated around 82% of its electricity using fossil fuels, as opposed to the latter’s 56%. In Sweden and Morocco, however, this way of producing electricity accounted for a mere 4% or so.</p>
            <p>With respect to utilizing hydropower to create electricity, Morocco led with a staggering 95%, far ahead of Sweden (52%) and Vietnam (44%). India, in the meantime, bottomed the list with only just below 5%.</p>
            <p>As for nuclear-generated electricity, only two countries depended on it. While Sweden produced 44% of its electricity using nuclear resources, the figure for India stood at just around 3%.</p>
        `
    },
    {
        id: "new-5",
        title: "Overseas Visitors to European Areas (1987-2007)",
        band: "9.0",
        wordCount: 230, // Approx
        type: "report",
        content: `
            <p>The line chart shows how many foreign tourists went to a country in Europe to visit three holiday destinations from 1987 and 2007. It is clear that all three areas in the said country saw – despite irregular fluctuations – an overall rise in the number visitors, albeit to varying degrees over the given period. While the general upward trends for the coast and lake were substantial, that for the mountains was moderate. Additionally, although the lake was the least popular choice at first, this destination hit the chart-high point in 2002.</p>
            <p>Starting with the numbers for the coast, this area was the most preferred option for the most part of the timeframe, with 40,000 people from overseas going there in 1987. For the subsequent five years, the figure gradually declined to just over 30,000 by 1992, followed by a quick rise to more than 50,000 until 1997. Although the growth had slowed since then, it continued steadily, with the number of visitors reaching 70,000 in 2007.</p>
            <p>The lake area, in the meantime, showed a threefold increase initially, going from 10,000 in 1987 to 30,000 in 1992. This was followed by a bell-curved rise to 40,000 until 1997, then a sharp growth to 75,000 by 2002, when the number started to fall quickly, dipping to around 55,000 in 2007.</p>
            <p>Finally, the number of visitors to the mountains experienced the least notable change. Having attracted 20,000 visitors in 1987, the area recorded no change in this regard for the next five years. By 1997, however, the figure climbed slightly and gradually before falling to the roughly initial point by 2002. The concluding five years saw the number grow markedly until it reached 30,000 in 2007.</p>
        `
    },
    {
        id: "new-6",
        title: "Sports Participation (1985-2005)",
        band: "9.0",
        wordCount: 200, // Approx
        type: "report",
        content: `
            <p>The line chart shows the distribution of participants across four different sports in some area, from 1985 and 2005. It is clear that there was a dramatic fall in the number of Rugby athletes while the figure for tennis enthusiasts saw a marked rise over the period. Additionally, Basketball and Badminton showed a very negligible change throughout, with the latter remaining the least popular choice over the entire span.</p>
            <p>Rugby depreciated significantly in popularity between 1985 and 2005, with just under 250 people in the said region played it initially. Despite being the chart-high, this number dropped steadily to just above 200 until 1990, followed by a slight fall by 1995. The declines over the next ten years were even more significant as the figure hit 150 in 2000 and 50 in 2005.</p>
            <p>Tennis, in the meantime, become more and more popular over the same period. Having started at 150 in 1985, it attracted considerably more participants over the next ten years – 200 in 1995. The next decade, in contrast, saw a slower growth, yet steady, with the figure reaching around 225 in 2005.</p>
            <p>As for the sports with minimal changes, basketball stood at roughly 75 and badminton at just about 50 in 1985. They both remained stable almost throughout the period, with the latter only dropping slightly for the first five years.</p>
        `
    },
    { id: "1", title: "Banning Ads: Agree or Disagree", band: "8.5", wordCount: 356, type: "essay" },
    { id: "2", title: "Driverless Cars: Advantages Vs. Disadvantages", band: "8.0", wordCount: 336, type: "essay" },
    { id: "3", title: "More Older People: Positive or Negative Development?", band: "7.5", wordCount: 252, type: "essay" },
    { id: "4", title: "More Housing Instead of Parks: Positive or Negative Development?", band: "8.0", wordCount: 319, type: "essay" },
    { id: "5", title: "Celebrities Expressing Opinions on Social Issues", band: "9.0", wordCount: 418, type: "essay" },
    { id: "6", title: "Success is Luck: Agree or Disagree?", band: "8.0", wordCount: 300, type: "essay" },
    { id: "7", title: "Delayed Parenthood: Advantages Vs Disadvantages", band: "7.5", wordCount: 277, type: "essay" },
    { id: "8", title: "University - A Waste Of Time: Agree or Disagree", band: "8.5", wordCount: 327, type: "essay" },
    { id: "9", title: "Interviews Are Unreliable: Agree Or Disagree", band: "9.0", wordCount: 396, type: "essay" },
    { id: "10", title: "Punishing Parents: Agree Or Disagree", band: "8.5", wordCount: 365, type: "essay" },
    { id: "11", title: "Purpose Of Movies: Discussion", band: "8.0", wordCount: 310, type: "essay" },
    { id: "12", title: "Storing Information On The Internet: Advantages Vs. Disadvantages", band: "7.5", wordCount: 289, type: "essay" },
    { id: "13", title: "International Tourism: Advantages Vs. Disadvantages", band: "7.5", wordCount: 256, type: "essay" },
    { id: "14", title: "Children and Technology: Advantages Vs. Disadvantages", band: "7.0", wordCount: 231, type: "essay" },
    { id: "15", title: "Lack Of Exercise: Causes and Solutions", band: "7.5", wordCount: 267, type: "essay" },
    { id: "16", title: "Lack of Focus in Schools: Causes and Solutions", band: "7.0", wordCount: 245, type: "essay" },
    { id: "17", title: "Noise Pollution: Causes And Solutions", band: "7.5", wordCount: 269, type: "essay" },
    { id: "18", title: "Increasing Driving Age to Ensure Safety: Agree or Disagree", band: "8.0", wordCount: 285, type: "essay" },
    { id: "19", title: "Is Life in 21st Century Better: Agree or Disagree", band: "7.5", wordCount: 250, type: "essay" },
    { id: "20", title: "Banning advertising: Agree or Disagree", band: "7.5", wordCount: 250, type: "essay" },
];

import { X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function SamplesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSample, setSelectedSample] = useState<SampleItem | null>(null);

    const filteredSamples = SAMPLES.filter(sample =>
        sample.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout
            title="Band 9.0 Samples"
            description="Explore our curated collection of high-scoring IELTS essays and reports."
        >
            <div className="max-w-5xl mx-auto space-y-8">

                {/* --- Hero Banner (Red Gradient) --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-600 to-rose-500 shadow-xl shadow-red-500/20 text-center py-12 px-6"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                            <BookOpen className="w-4 h-4 text-white" />
                            <span className="text-white font-bold text-sm tracking-wide">Volume 1</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-sm">
                            My Writing Sample Book
                        </h1>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-white font-medium text-sm">
                                <FileText className="w-4 h-4" /> 20 Band 8-9 Essays
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-white font-medium text-sm">
                                <BadgeCheck className="w-4 h-4" /> 20 Band 8-9 Reports
                            </div>
                        </div>

                        <button className="bg-white text-red-600 font-bold px-8 py-3 rounded-full flex items-center gap-2 hover:bg-red-50 transition-colors shadow-lg shadow-black/10 group">
                            <PenTool className="w-4 h-4" />
                            Access Now
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* --- Search Bar --- */}
                <div className="relative max-w-xl mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a topic..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-700 rounded-full py-3.5 pl-12 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all placeholder:text-slate-400"
                    />
                </div>

                {/* --- Samples List --- */}
                <div className="space-y-3">
                    {filteredSamples.map((sample, index) => (
                        <motion.div
                            key={sample.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => setSelectedSample(sample)}
                                className="group w-full bg-white hover:bg-red-50/50 border border-slate-200 hover:border-red-200 rounded-xl p-4 flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <div className="flex-1 text-left">
                                    <h3 className="font-semibold text-slate-700 group-hover:text-red-700 transition-colors text-base md:text-lg">
                                        {sample.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 md:gap-8 flex-shrink-0 ml-4">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm min-w-[70px] text-center",
                                        parseFloat(sample.band) >= 8.5 ? "bg-red-600" : "bg-red-500"
                                    )}>
                                        Band {sample.band}
                                    </div>

                                    <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-400 min-w-[80px]">
                                        <FileText className="w-3.5 h-3.5" />
                                        {sample.wordCount} words
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
                                </div>
                            </button>
                        </motion.div>
                    ))}

                    {filteredSamples.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-500">No samples found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>

                {/* --- Content Viewer Modal --- */}
                <AnimatePresence>
                    {selectedSample && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedSample(null)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl flex flex-col"
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                                selectedSample.type === 'report' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                                            )}>
                                                {selectedSample.type}
                                            </span>
                                            <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                                                Band {selectedSample.band}
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                                            {selectedSample.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedSample(null)}
                                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Modal Content (Scrollable) */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                                    {selectedSample.content ? (
                                        <div
                                            className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-loose prose-lg"
                                            dangerouslySetInnerHTML={{ __html: selectedSample.content }}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                                <PenTool className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-700 mb-2">Content Coming Soon</h3>
                                            <p className="text-slate-500 max-w-xs mx-auto">
                                                The full text for this sample is being digitized. Please check back later.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Modal Footer */}
                                <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center text-sm text-slate-400">
                                    {selectedSample.wordCount} words • {selectedSample.type === 'report' ? 'Task 1' : 'Task 2'}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </DashboardLayout>
    );
}

