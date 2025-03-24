import React from "react";
import ProjectStats from "../components/projects/ProjectStats.tsx";
import ProjectCard from "../components/projects/ProjectCard.tsx";

export default function ProjectDashboard() {
  const projects = [
    { id: 1, name: "Website Redesign", status: "Active", progress: 75, deadline: "2025-04-10" },
    { id: 2, name: "Mobile App Development", status: "Pending", progress: 30, deadline: "2025-06-01" },
    { id: 3, name: "Cloud Migration", status: "Completed", progress: 100, deadline: "2025-02-20" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Stats Section */}
      <ProjectStats projects={projects} />

      {/* Project List */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard  project={project} />
        ))}
      </div>
    </div>
  );
}
