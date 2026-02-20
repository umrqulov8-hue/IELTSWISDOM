"use client";

import { Clock, BarChart, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { motion } from "framer-motion";

interface CourseCardProps {
    title: string;
    description: string;
    level: string;
    duration: string;
    price: string;
    lessons: number;
    popular?: boolean;
    delay?: number;
}

export function CourseCard({
    title,
    description,
    level,
    duration,
    price,
    lessons,
    popular,
    delay = 0,
}: CourseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`group relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg dark:bg-slate-900 ${popular ? "border-secondary ring-1 ring-secondary" : "border-slate-200 dark:border-slate-800"
                }`}
        >
            {popular && (
                <div className="absolute -top-3 right-6 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                </div>
            )}

            <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1">
                    <BarChart className="h-4 w-4 text-primary" />
                    <span>{level}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{duration}</span>
                </div>
            </div>

            <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {title}
            </h3>

            <p className="mb-6 text-sm text-muted-foreground flex-grow">
                {description}
            </p>

            <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-secondary" />
                    <span>{lessons} Lessons</span>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="text-lg font-bold text-primary">{price}</div>
                <Button variant={popular ? "primary" : "outline"} size="sm" className="group/btn">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
            </div>
        </motion.div>
    );
}
