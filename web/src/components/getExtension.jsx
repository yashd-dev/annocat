"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
export default function GetExtension() {
    const [browser, setBrowser] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userAgent = navigator.userAgent;
            if (userAgent.includes("Edg")) {
                setBrowser("Microsoft Edge");
            } else if (userAgent.includes("Chrome")) {
                setBrowser("Google Chrome");
            } else if (userAgent.includes("Firefox")) {
                setBrowser("Mozilla Firefox");
            } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
                setBrowser("Apple Safari");
            } else if (userAgent.includes("Opera") || userAgent.includes("Opr")) {
                setBrowser("Opera");
            } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
                setBrowser("Internet Explorer");
            } else {
                setBrowser("Unknown Browser");
            }
        }
    }, []);

    // Placeholder extension links
    const extensionLinks = {
        "Google Chrome": "https://chrome.google.com/webstore/detail/your-extension-id",
        "Microsoft Edge": "https://microsoftedge.microsoft.com/addons/detail/your-extension-id",
        "Mozilla Firefox": "https://addons.mozilla.org/firefox/addon/your-extension-id",
        "Apple Safari": "https://apps.apple.com/app/your-extension-id",
    };

    let button = null;
    if (browser === "Google Chrome" || browser === "Microsoft Edge") {
        button = (
            <a href={extensionLinks[browser]} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-blue hover:bg-light-blue dark:text-white">
                    <img src="/chrome.svg" alt="" className="size-5" />
                    Install for {browser}
                </Button>
            </a>
        );
    } else if (browser === "Mozilla Firefox") {
        button = (
            <a href={extensionLinks[browser]} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-700 dark:text-white">
                    Install for Firefox
                </Button>
            </a>
        );
    } else if (browser === "Apple Safari") {
        button = (
            <a href={extensionLinks[browser]} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-700 dark:text-white">
                    Install for Safari
                </Button>
            </a>
        );
    } else {
        button = (
            <a href={extensionLinks["Google Chrome"]} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-700 dark:text-white">
                    Install for Chrome
                </Button>
            </a>
        );
    }

    return (
        <div className=" flex flex-col sm:flex-row justify-center items-center gap-5 pt-5 ">
            {button}
            <a href="/login">

                <Button size={"lg"} className={"w-full sm:w-fit"}>
                    Go To Dashboard
                </Button>
            </a>

        </div >
    );
}