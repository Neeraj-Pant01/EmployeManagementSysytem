import React, { useState } from "react";

interface User {
  id: number;
  name: string;
}

const usersList: User[] = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Adams" },
];

const NewProjectPage: React.FC = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    requirements: "",
    startDate: "",
    deadline: "",
    priority: "Medium",
    status: "Pending",
    assignedUsers: [] as number[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleUserSelection = (userId: number) => {
    setProject((prev) => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(userId)
        ? prev.assignedUsers.filter((id) => id !== userId)
        : [...prev.assignedUsers, userId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.title || !project.startDate || !project.deadline) {
      alert("Please fill all required fields!");
      return;
    }
    console.log("New Project Submitted:", project);
    alert("Project Created Successfully!");
    setProject({
      title: "",
      description: "",
      requirements: "",
      startDate: "",
      deadline: "",
      priority: "Medium",
      status: "Pending",
      assignedUsers: [],
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Create New Project <span className='text-[grey]'>⚒</span></h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Title */}
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleChange}
          placeholder="Project Title *"
          className="w-full p-2 border rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full p-2 border rounded"
        />

        {/* Requirements */}
        <textarea
          name="requirements"
          value={project.requirements}
          onChange={handleChange}
          placeholder="Project Requirements"
          className="w-full p-2 border rounded"
        />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="deadline"
            value={project.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Priority & Status */}
        <div className="grid grid-cols-2 gap-4">
          <select name="priority" value={project.priority} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <select name="status" value={project.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Assign Users */}
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Assign Users</h3>
          <div className="flex flex-wrap gap-3">
            {usersList.map((user) => (
              <label key={user.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={project.assignedUsers.includes(user.id)}
                  onChange={() => handleUserSelection(user.id)}
                />
                <span>{user.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProjectPage;
