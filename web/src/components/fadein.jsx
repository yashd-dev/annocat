"use client";
import { motion } from "motion/react";

export default function FadeIn({ children, delay = 0, duration = 0.6, y = 0, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration, delay, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
