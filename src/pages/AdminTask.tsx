import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
}

const employees = ["John Doe", "Jane Smith", "Mark Johnson", "Emily Davis"];

const initialTasks: Task[] = [
  { id: 1, title: "Fix Backend Bug", description: "Resolve API error", assignedTo: "John Doe", status: "Pending", dueDate: "2025-03-20" },
  { id: 2, title: "UI Improvements", description: "Enhance dashboard design", assignedTo: "Jane Smith", status: "In Progress", dueDate: "2025-03-22" },
  { id: 3, title: "Database Optimization", description: "Improve query performance", assignedTo: "Mark Johnson", status: "Completed", dueDate: "2025-03-18" },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState({ status: "", assignedTo: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "", status: "Pending", dueDate: "" });

  // Handle Filters
  const filteredTasks = tasks.filter((task) =>
    (filters.status ? task.status === filters.status : true) &&
    (filters.assignedTo ? task.assignedTo === filters.assignedTo : true)
  );

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, isEditing = false) => {
    const { name, value } = e.target;
    if (isEditing && editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  // Handle Task Update
  const handleUpdateTask = () => {
    setTasks(tasks.map((t) => (t.id === editingTask?.id ? editingTask : t)));
    setEditingTask(null);
  };

  // Handle Task Creation
  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.assignedTo || !newTask.dueDate) return;
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    setNewTask({ title: "", description: "", assignedTo: "", status: "Pending", dueDate: "" });
    setShowPopup(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Task Management 📝</h2>
        <button onClick={() => setShowPopup(true)} className="bg-blue-500 text-white px-4 py-2 rounded">+ New Task</button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 shadow rounded flex gap-4 mb-4">
        <select className="p-2 border rounded" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select className="p-2 border rounded" value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
          <option value="">Filter by Employee</option>
          {employees.map((emp, index) => <option key={index} value={emp}>{emp}</option>)}
        </select>
      </div>

      {/* Task Table */}
      <div className="bg-white p-4 shadow rounded">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Assigned To</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Due Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="border p-2">{task.title}</td>
                <td className="border p-2">{task.assignedTo}</td>
                <td className={`border p-2 ${task.status === "Pending" ? "text-yellow-500" : task.status === "In Progress" ? "text-blue-500" : "text-green-500"}`}>
                  {task.status}
                </td>
                <td className="border p-2">{task.dueDate}</td>
                <td className="border p-2">
                  <button onClick={() => setEditingTask(task)} className="text-blue-600">Edit</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="text-center p-4 text-gray-500">No tasks found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New Task Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-semibold">New Task</h3>
              <button onClick={() => setShowPopup(false)} className="text-red-500 font-bold">✖</button>
            </div>
            <input type="text" name="title" placeholder="Task Title" value={newTask.title} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <textarea name="description" placeholder="Description" value={newTask.description} onChange={handleChange} className="w-full p-2 mb-3 border rounded"></textarea>
            <select name="assignedTo" value={newTask.assignedTo} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
              <option value="">Assign to Employee</option>
              {employees.map((emp, index) => <option key={index} value={emp}>{emp}</option>)}
            </select>
            <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
            <button onClick={handleCreateTask} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Create Task</button>
          </div>
        </div>
      )}
    </div>
  );
}
