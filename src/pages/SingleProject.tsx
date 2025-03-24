import React, { useState } from "react";
import ProjectDetails from "../components/projects/ProjectDetails.tsx";
import ProjectCalendar from "../components/projects/ProjectCalendar.tsx";
import RequirementsPopup from "../components/projects/RequirementsPopup.tsx";
interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  requirements: string[];
}

export default function SingleProject() {
  const [showRequirements, setShowRequirements] = useState(false);

  const project: Project = {
    id: 1,
    name: "Website Redesign",
    description: "Redesigning the company website to improve UX and performance.",
    startDate: "2025-03-01",
    endDate: "2025-04-15",
    requirements: ["Figma design review", "Responsive layout", "SEO optimization"],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Project Details */}
      <ProjectDetails project={project} onShowRequirements={() => setShowRequirements(true)} />

      {/* Calendar View */}
      <ProjectCalendar startDate={project.startDate} endDate={project.endDate} />

      {/* Requirements Popup */}
      {showRequirements && (
        <RequirementsPopup
          requirements={project.requirements}
          onClose={() => setShowRequirements(false)}
        />
      )}
    </div>
  );
}
