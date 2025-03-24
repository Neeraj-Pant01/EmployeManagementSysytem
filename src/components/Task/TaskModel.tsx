import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  status: "To-Do" | "In Progress" | "Completed" | "Blocked";
  priority: "Low" | "Medium" | "High" | "Urgent";
  deadline: string;
  assignee: string;
  description: string;
}

interface TaskDetailsModalProps {
  task: Task | null;
  onClose: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ task, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  if (!task) return null;


  const handleUpdate = () => {
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Task Details</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input type="text" className="w-full p-2 border rounded" value={updatedTask.title} readOnly />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full p-2 border rounded" value={updatedTask.description} readOnly />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            className="w-full p-2 border rounded"
            value={updatedTask.status}
            onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value as Task["status"] })}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
            Close
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleUpdate}>
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
