/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
      "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
            "slide-in-from-left-8": {
              "0%": { transform: "translateX(-2rem)", opacity: "0" },
              "100%": { transform: "translateX(0)", opacity: "1" },
            },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
        typography: {
          DEFAULT: {
            css: {
              maxWidth: "none",
              color: "inherit",
              a: {
                color: "inherit",
                textDecoration: "none",
                fontWeight: "500",
              },
              '[class~="lead"]': {
                color: "inherit",
              },
              strong: {
                color: "inherit",
              },
              'ol[type="A"]': {
                listStyleType: "upper-alpha",
              },
              'ol[type="a"]': {
                listStyleType: "lower-alpha",
              },
              'ol[type="A" s]': {
                listStyleType: "upper-alpha",
              },
              'ol[type="a" s]': {
                listStyleType: "lower-alpha",
              },
              'ol[type="I"]': {
                listStyleType: "upper-roman",
              },
              'ol[type="i"]': {
                listStyleType: "lower-roman",
              },
              'ol[type="I" s]': {
                listStyleType: "upper-roman",
              },
              'ol[type="i" s]': {
                listStyleType: "lower-roman",
              },
              'ol[type="1"]': {
                listStyleType: "decimal",
              },
              "ul > li": {
                paddingLeft: "1.5em",
              },
              "ul > li::before": {
                width: "0.375em",
                height: "0.375em",
                top: "calc(0.875em - 0.1875em)",
                left: "0.25em",
              },
              "ol > li": {
                paddingLeft: "1.5em",
              },
              "ol > li::before": {
                left: "0",
              },
            },
          },
        },
      },
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  }
  
  