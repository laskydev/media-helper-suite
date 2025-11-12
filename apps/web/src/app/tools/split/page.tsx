import Link from 'next/link';
import { Button } from '@pdfcraft/ui';

export default function SplitPage(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Split PDF</h1>
      <p className="text-lg text-text-secondary mb-8">Coming soon...</p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
