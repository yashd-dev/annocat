"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"


export function Provider({
    children,
    ...props
}) {
    return <NextThemesProvider attribute="class"
        defaultTheme="light"
        disableTransitionOnChange>{children}        <Toaster />
    </NextThemesProvider>
}