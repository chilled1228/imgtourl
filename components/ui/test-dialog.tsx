'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function TestDialog() {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <h2 className="text-lg font-semibold mb-2">Test Dialog</h2>
          <p className="text-sm text-gray-600 mb-4">
            This is a simple test dialog to check if dialogs are working properly.
          </p>
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        console.log('Test Dialog Button clicked');
        setIsOpen(true);
      }}
    >
      Simple Test Dialog
    </Button>
  );
}
