import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteConfig } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: {
      default: `${config.companyName} | Commercial & Office Cleaning Melbourne`,
      template: `%s | ${config.companyName}`
    },
    description: config.footer.about,
    metadataBase: new URL('https://sivcleaning.com.au'),
    alternates: {
      canonical: '/'
    },
    openGraph: {
      title: `${config.companyName} | Commercial Cleaning Melbourne`,
      description: config.footer.about,
      url: 'https://sivcleaning.com.au',
      siteName: config.companyName,
      locale: 'en_AU',
      type: 'website'
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-white text-slate-800">
        <Header config={config} />
        <main className="flex-1">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
