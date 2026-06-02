
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#1E2B7E',
					50: '#F0F2FE',
					100: '#E1E5FD',
					200: '#C9D1FB',
					300: '#A4B3F7',
					400: '#7A8CF1',
					500: '#5A6AE8',
					600: '#4450DC',
					700: '#3A3FC2',
					800: '#1E2B7E',
					900: '#1A2470',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#266AB2',
					50: '#F0F7FE',
					100: '#DEEFFE',
					200: '#B4E0FD',
					300: '#72C7FC',
					400: '#28AAF8',
					500: '#266AB2',
					600: '#0F6FE9',
					700: '#0C58D6',
					800: '#1049AE',
					900: '#134089',
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#E6E08E',
					50: '#FCFBF4',
					100: '#F9F6E9',
					200: '#F2ECD3',
					300: '#E9DCB3',
					400: '#E6E08E',
					500: '#D4C366',
					600: '#C0A449',
					700: '#A08439',
					800: '#846A31',
					900: '#70582B',
					foreground: '#000000'
				},
				neutral: {
					DEFAULT: '#000000',
					50: '#F8F8F8',
					100: '#F0F0F0',
					200: '#E4E4E4',
					300: '#D1D1D1',
					400: '#B4B4B4',
					500: '#9A9A9A',
					600: '#818181',
					700: '#6A6A6A',
					800: '#5A5A5A',
					900: '#4A4A4A',
					950: '#000000',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'telegraf': ['"PP Telegraf"', '"DM Sans"', 'system-ui', 'sans-serif'],
				'sans': ['"PP Telegraf"', '"DM Sans"', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'float': 'float 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
