"use client"
import "@/app/global.css";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Sidebar />
				{children}
			</body>
		</html>
	);
}