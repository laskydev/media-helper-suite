import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@pdfcraft/ui';

const tools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    href: '/tools/merge',
    icon: '📄',
  },
  {
    title: 'Split PDF',
    description: 'Extract pages or split PDF into multiple files',
    href: '/tools/split',
    icon: '✂️',
  },
  {
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    href: '/tools/compress',
    icon: '🗜️',
  },
  {
    title: 'Convert PDF',
    description: 'Convert PDF to and from other formats',
    href: '/tools/convert',
    icon: '🔄',
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate pages in your PDF document',
    href: '/tools/rotate',
    icon: '↻',
  },
  {
    title: 'Protect PDF',
    description: 'Add password protection to your PDF',
    href: '/tools/protect',
    icon: '🔒',
  },
];

export default function Home(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Every tool you need to work with PDFs</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">
          All-in-one PDF solution. Easy to use, fast, and completely free.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full cursor-pointer">
              <CardHeader>
                <div className="text-4xl mb-2">{tool.icon}</div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose PDFCraft?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Fast & Easy</h3>
            <p className="text-text-secondary text-sm">
              Process your PDFs in seconds with our intuitive interface
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold mb-2">Secure</h3>
            <p className="text-text-secondary text-sm">
              Your files are automatically deleted after processing
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">💯</div>
            <h3 className="font-semibold mb-2">100% Free</h3>
            <p className="text-text-secondary text-sm">
              All tools are completely free to use, no limits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
