import React from 'react'

export default function FormError({errors}) {
  if (!errors) return null;

  return errors.map((error, index) => (
    <div key={index} className="text-red-600 text-xs mt-1 py-2">
      {error}
    </div>
  ));
}
