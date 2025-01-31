"use client"
import Navbar from "../../components/Navbar/Navbar";
import '@/app/globals.css'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <link href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css" rel="stylesheet" /> 
            <Navbar />
            {children}
        </>
    );
}
