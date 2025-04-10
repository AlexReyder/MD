import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin", "cyrillic"],
	weight:["400", "500", "600", "700", "800"]
});


export const metadata: Metadata = {
	title: {
			template: '%s | Панель администратора',
			default: 'Главная | Панель администратора',
		},
};

export const viewport: Viewport = {
	themeColor: 'light',
}


export default function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={`${manrope.variable}`}>
				{children}
			</body>
		</html>
	);
}
