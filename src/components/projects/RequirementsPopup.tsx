import React from "react";

interface RequirementsPopupProps {
  requirements: string[];
  onClose: () => void;
}

export default function RequirementsPopup({ requirements, onClose }: RequirementsPopupProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Project Requirements</h3>
        <ul className="list-disc pl-5">
          {requirements.map((req, index) => (
            <li key={index} className="text-gray-700">{req}</li>
          ))}
        </ul>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
