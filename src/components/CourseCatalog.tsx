"use client";

import { CourseCard } from "./CourseCard";
import { motion } from "framer-motion";

const courses = [
    {
        title: "General English Mastery",
        description: "Build a strong foundation in grammar, vocabulary, and daily conversation skills.",
        level: "Beginner - Intermediate",
        duration: "12 Weeks",
        lessons: 48,
        price: "$199",
        delay: 0,
        popular: false,
    },
    {
        title: "IELTS Prep Intensive",
        description: "Targeted strategies and practice to help you achieve Band 7.0+ in your exam.",
        level: "Advanced",
        duration: "8 Weeks",
        lessons: 32,
        price: "$299",
        delay: 0.2,
        popular: true,
    },
    {
        title: "Business English Pro",
        description: "Master professional communication for meetings, emails, and presentations.",
        level: "Intermediate+",
        duration: "10 Weeks",
        lessons: 40,
        price: "$249",
        delay: 0.4,
        popular: false,
    },
];

export function CourseCatalog() {
    return (
        <section id="courses" className="py-20 bg-slate-50 dark:bg-slate-950/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.5, duration: 1 } }
                        }}
                        className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4"
                    >
                        Explore Our <span className="text-secondary">Premium Courses</span>
                    </motion.h2>
                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", bounce: 0.5, duration: 1 } }
                        }}
                        className="text-lg text-muted-foreground"
                    >
                        Whether you want to travel, advance your career, or pass an exam, we have a structured path for you.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.title}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <CourseCard
                                {...course}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
