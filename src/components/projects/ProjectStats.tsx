import React from "react";

interface Project {
  id: number;
  name: string;
  status: string;
  progress: number;
  deadline: string;
}

interface ProjectStatsProps {
  projects: Project[];
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const completedProjects = projects.filter((p) => p.status === "Completed").length;

  return (
    <div className="flex justify-between bg-white shadow-md p-4 rounded-lg">
      <div>
        <h2 className="text-lg font-semibold">Total Projects</h2>
        <p className="text-xl font-bold">{totalProjects}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Active</h2>
        <p className="text-xl font-bold text-blue-500">{activeProjects}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Completed</h2>
        <p className="text-xl font-bold text-green-500">{completedProjects}</p>
      </div>
    </div>
  );
}
