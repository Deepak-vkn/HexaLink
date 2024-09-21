import React from 'react'

const rightBanner = () => {
  return (
    <div className="md:col-span-1 space-y-4">
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src="/api/placeholder/400/200"
        alt="Right Banner"
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Right Ad  Banner</h3>
        <p className="text-sm text-gray-600"></p>
      </div>
    </div>
  </div>
  )
}

export default rightBanner
