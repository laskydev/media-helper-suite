import Link from 'next/link';
import { Button, Card, CardDescription, CardHeader, CardTitle } from '@pdfcraft/ui';

const tools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    href: '/tools/merge',
    icon: '📄',
    available: true,
  },
  {
    title: 'Split PDF',
    description: 'Extract pages or split PDF into multiple files',
    href: '/tools/split',
    icon: '✂️',
    available: false,
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate pages in your PDF document',
    href: '/tools/rotate',
    icon: '↻',
    available: false,
  },
  {
    title: 'Extract Pages',
    description: 'Create new PDF with selected pages',
    href: '/tools/extract',
    icon: '📑',
    available: false,
  },
  {
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    href: '/tools/compress',
    icon: '🗜️',
    available: false,
  },
  {
    title: 'Convert PDF',
    description: 'Convert PDF to and from other formats',
    href: '/tools/convert',
    icon: '🔄',
    available: false,
  },
];

export default function Home(): JSX.Element {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center py-20 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
          ✨ 100% Client-Side • Privacy-First • Open Source
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Every PDF Tool You Need
          <br />
          <span className="text-primary">In Your Browser</span>
        </h1>

        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Merge, split, rotate, and manipulate PDFs without uploading files to any server. Your
          documents never leave your device. 100% free, forever.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/tools/merge">
            <Button size="lg" className="text-lg px-8">
              Try Merge PDF →
            </Button>
          </Link>
          <Link href="/tools">
            <Button variant="secondary" size="lg" className="text-lg px-8">
              View All Tools
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-text-secondary">Private</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">0</div>
            <div className="text-sm text-text-secondary">Servers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">Free</div>
            <div className="text-sm text-text-secondary">Forever</div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">PDF Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="h-full cursor-pointer relative">
                <CardHeader>
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                  {!tool.available && (
                    <span className="absolute top-4 right-4 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                  {tool.available && (
                    <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      ✓ Available
                    </span>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 -mx-4 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why PDFCraft?</h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            Built with modern web technologies to give you the best PDF manipulation experience
            while keeping your data private.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
              <p className="text-text-secondary">
                All processing happens in your browser. Your files never leave your device. No
                uploads, no servers, no tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-text-secondary">
                Powered by WebAssembly for near-native performance. Process PDFs in seconds without
                waiting for uploads or downloads.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-3">100% Free</h3>
              <p className="text-text-secondary">
                No subscriptions, no hidden fees, no limits. All features are completely free and
                will remain free forever.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-3">Works Offline</h3>
              <p className="text-text-secondary">
                Once loaded, works without internet. Perfect for sensitive documents or when
                traveling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Simple & Intuitive</h3>
              <p className="text-text-secondary">
                Clean interface with drag-and-drop support. No learning curve, just select files and
                go.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <div className="text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-semibold mb-3">Open Source</h3>
              <p className="text-text-secondary">
                Built with modern open-source technologies. Transparent, auditable, and
                community-driven.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Select Your Files</h3>
              <p className="text-text-secondary">
                Choose PDF files from your computer or drag and drop them into the browser. Your
                files stay on your device.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Process Locally</h3>
              <p className="text-text-secondary">
                Our WebAssembly-powered engine processes your PDFs right in your browser. Watch
                real-time progress as files are manipulated.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Download Result</h3>
              <p className="text-text-secondary">
                Get your processed PDF instantly. No waiting for server processing or slow
                downloads. Your data never touches our servers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center bg-primary text-white -mx-4 px-4 rounded-lg my-16">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Try our PDF merge tool now and experience the power of client-side processing.
        </p>
        <Link href="/tools/merge">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 bg-white text-primary hover:bg-gray-100"
          >
            Merge PDFs Now →
          </Button>
        </Link>
      </div>
    </div>
  );
}
