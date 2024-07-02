import type { Metadata } from 'next';
import { News_Cycle } from 'next/font/google';

import './globals.css';

export const metadata: Metadata = {
    title: 'Magic Manager',
    description: 'Manage your Magic'
};

const primaryFont = News_Cycle({ subsets: ['latin'], weight: '700' });

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={primaryFont.className}>
            <body>{children}</body>
        </html>
    );
}
