import React from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  status: string;
  progress: number;
  deadline: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const navigation = useNavigate();
  return (
    <div className="bg-white shadow-md p-4 rounded-lg cursor-pointer" onClick={()=>navigation(`/dashboard/projects/123`)}>
      <h2 className="text-lg font-semibold">{project.name}</h2>
      <p className="text-sm text-gray-500">Deadline: {project.deadline}</p>
      <div className="mt-2">
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className={`h-2 rounded ${project.progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{project.progress}% Completed</p>
      </div>
    </div>
  );
}
