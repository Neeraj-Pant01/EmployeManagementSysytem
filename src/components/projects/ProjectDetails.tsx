import React from "react";

interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface ProjectDetailsProps {
  project: Project;
  onShowRequirements: () => void;
}

export default function ProjectDetails({ project, onShowRequirements }: ProjectDetailsProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mb-6">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="text-gray-600">{project.description}</p>
      <p className="mt-2 text-sm">Start Date: <b>{project.startDate}</b></p>
      <p className="text-sm">End Date: <b>{project.endDate}</b></p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onShowRequirements}
      >
        View Requirements
      </button>
    </div>
  );
}
