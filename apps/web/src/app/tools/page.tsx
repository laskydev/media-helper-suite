import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@pdfcraft/ui';

const allTools = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    href: '/tools/merge',
    icon: '📄',
    status: 'available',
  },
  {
    title: 'Split PDF',
    description: 'Extract pages or split PDF into multiple files',
    href: '/tools/split',
    icon: '✂️',
    status: 'coming-soon',
  },
  {
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    href: '/tools/compress',
    icon: '🗜️',
    status: 'coming-soon',
  },
  {
    title: 'Convert PDF',
    description: 'Convert PDF to and from other formats',
    href: '/tools/convert',
    icon: '🔄',
    status: 'coming-soon',
  },
  {
    title: 'Rotate PDF',
    description: 'Rotate pages in your PDF document',
    href: '/tools/rotate',
    icon: '↻',
    status: 'coming-soon',
  },
  {
    title: 'Protect PDF',
    description: 'Add password protection to your PDF',
    href: '/tools/protect',
    icon: '🔒',
    status: 'coming-soon',
  },
];

export default function ToolsPage(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">All PDF Tools</h1>
        <p className="text-lg text-text-secondary">
          Choose from our collection of PDF manipulation tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {allTools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="h-full cursor-pointer relative">
              <CardHeader>
                <div className="text-4xl mb-2">{tool.icon}</div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
                {tool.status === 'coming-soon' && (
                  <span className="absolute top-4 right-4 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
