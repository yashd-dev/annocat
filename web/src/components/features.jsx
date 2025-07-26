"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FEATURES = [
    {
        title: "Precise capture",
        desc: "Clip any section of any page—no more messy screenshots or full-page saves.",
        img: "/file.svg",
    },
    {
        title: "Add context, instantly",
        desc: "Attach notes right to your snippets, so your future self always remembers why you saved it.",
        img: "/window.svg",
    },
    {
        title: "Project-driven",
        desc: "Organize research, inspiration, or documentation into folders for clear focus.",
        img: "/globe.svg",
    },
    {
        title: "Local-first, privacy always",
        desc: "Not logged in? Your data stays on your device.",
        img: "/vercel.svg",
    },
    {
        title: "Cloud sync when you want",
        desc: "Log in to access and share across devices—never lose an insight.",
        img: "/next.svg",
    },
    {
        title: "Share with a link",
        desc: "Instantly create shareable links for projects or snippets with one click",
        img: "/file.svg",
    },
];

export default function Features() {
    const [selected, setSelected] = useState(0);

    return (
        <div className="w-full flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center py-12">
            {/* Feature List */}
            <div className="flex-1 flex flex-col gap-4 max-w-md w-full">
                {FEATURES.map((f, i) => (
                    <button
                        key={f.title}
                        onClick={() => setSelected(i)}
                        className={`text-left rounded-lg px-4 py-3 transition-all border border-transparent  hover:bg-card focus-visible:border-blue-500 outline-none ${selected === i ? "bg-card" : ""}`}
                    >
                        <div className="font-semibold text-lg mb-1">{f.title}</div>
                        <div className="text-gray-600 text-sm">{f.desc}</div>
                    </button>
                ))}
            </div>

            {/* Feature Image */}
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="aspect-[1360/725] h-64 md:h-[400px] w-full max-w-[600px] flex items-center justify-center rounded-xl shadow-md bg-black overflow-hidden"
                    >
                        <video
                            src="https://framerusercontent.com/assets/xczsI9Xq2X6OvsvU8NVUiUJUXuA.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-xl"
                            poster="https://placehold.co/600x320/000000/FFFFFF?text=Feature+Video"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
