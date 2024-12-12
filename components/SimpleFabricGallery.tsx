'use client';

import React from 'react';

interface SimpleFabricGalleryProps {
  fabrics: Array<{
    id: string;
    name: string;
  }>;
}

export default function SimpleFabricGallery({ fabrics }: SimpleFabricGalleryProps) {
  return (
    <div className="p-4">
      <h1>Simple Fabric Gallery</h1>
      <div className="grid gap-4">
        {fabrics.map(fabric => (
          <div key={fabric.id} className="p-4 border rounded">
            {fabric.name}
          </div>
        ))}
      </div>
    </div>
  );
}