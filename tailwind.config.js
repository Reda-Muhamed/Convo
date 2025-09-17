import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    daisyui: {
        styled: true, // تفعيل كل الـ styles
        themes: [
            {
                light: {
                    // ...require("daisyui/src/theming/themes")[
                    //     "[data-theme=light]"
                    // ],
                    primary: "#2563eb", // blue-600
                    secondary: "#9333ea", // purple-600
                    accent: "#22c55e", // green-500
                    neutral: "#1e293b", // slate-800
                    "base-100": "#ffffff",
                    info: "#0ea5e9",
                    success: "#10b981",
                    warning: "#f59e0b",
                    error: "#ef4444",
                },
            },
            {
                dark: {
                    // ...require("daisyui/src/theming/themes")[
                    //     "[data-theme=dark]"
                    // ],
                    primary: "#3b82f6", // blue-500
                    secondary: "#a855f7", // purple-500
                    accent: "#4ade80", // green-400
                    neutral: "#0f172a", // slate-900
                    "base-100": "#1e293b",
                    info: "#38bdf8",
                    success: "#22c55e",
                    warning: "#facc15",
                    error: "#f87171",
                },
            },
            "cupcake", // ثيم جاهز من daisyUI
            "bumblebee",
            "corporate",
        ],
        darkTheme: "dark", // الثيم الافتراضي لما يكون dark
        base: true, // تفعيل base styles (reset)
        utils: true, // تفعيل util classes
        logs: true, // logs في الكونسول
        rtl: false, // لو عايز RTL خليها true
        prefix: "", // prefix للـ classes
    },

    plugins: [forms, require("daisyui")],
};
