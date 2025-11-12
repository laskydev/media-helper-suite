import type { Metadata } from 'next';
import './globals.css';
import { Header, HeaderContainer, HeaderLogo, HeaderNav, HeaderActions } from '@pdfcraft/ui';
import { Button } from '@pdfcraft/ui';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PDFCraft - PDF Tools Made Simple',
  description: 'Merge, split, compress, and convert PDF files online for free',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Header>
          <HeaderContainer>
            <HeaderLogo>
              <Link href="/" className="text-2xl font-bold text-primary">
                PDFCraft
              </Link>
            </HeaderLogo>

            <HeaderNav>
              <Link
                href="/tools/merge"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Merge PDF
              </Link>
              <Link
                href="/tools/split"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Split PDF
              </Link>
              <Link
                href="/tools/compress"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Compress PDF
              </Link>
              <Link
                href="/tools/convert"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                Convert PDF
              </Link>
              <Link
                href="/tools"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                All Tools
              </Link>
            </HeaderNav>

            <HeaderActions>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </HeaderActions>
          </HeaderContainer>
        </Header>

        <main className="min-h-screen">{children}</main>

        <footer className="border-t bg-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-text-secondary">
            <p>&copy; 2024 PDFCraft. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
