import React, { useState } from "react";
import TaskDetailsModal from "./Task/TaskModel.tsx";

interface Task {
  id: number;
  title: string;
  status: "To-Do" | "In Progress" | "Completed" | "Blocked";
  priority: "Low" | "Medium" | "High" | "Urgent";
  deadline: string;
  assignee: string;
  description: string;
}

const initialTasks: Task[] = [
  { id: 1, title: "Develop Login Page", status: "In Progress", priority: "High", deadline: "2025-03-20", assignee: "John Doe", description: "Design and develop a secure login page." },
  { id: 2, title: "Database Optimization", status: "To-Do", priority: "Urgent", deadline: "2025-03-22", assignee: "Jane Smith", description: "Optimize slow database queries." },
  { id: 3, title: "UI Improvements", status: "Completed", priority: "Medium", deadline: "2025-03-15", assignee: "Alice Brown", description: "Enhance UI components for better UX." },
];

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Task Management</h2>

      {/* Task List Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Task</th>
            <th className="p-3">Status</th>
            <th className="p-3">Priority</th>
            <th className="p-3">Deadline</th>
            <th className="p-3">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedTask(task)}>
              <td className="p-3">{task.title}</td>
              <td className="p-3">
                <span className={`px-2 w-[70%] py-1 text-sm rounded ${task.status === "Completed" ? "bg-green-500 text-white" : task.status==='In Progress' ? 'bg-[goldenrod] text-[white]' : task.status === "Blocked" ? 'bg-red-500 text-[white]' :  "bg-gray-300"}`}>
                  {task.status} 
                </span>
              </td>
              <td className="p-3">
                <span className={`px-2 py-1 text-sm rounded ${task.priority === "Urgent" ? "bg-red-500 text-white" : task.priority === "High" ? "bg-blue-500 text-white" : task.priority === "Medium" ? "bg-green-500 text-white" : "bg-gray-300"}`}>
                  {task.priority}
                </span>
              </td>
              <td className="p-3">{task.deadline}</td>
              <td className="p-3">{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Task Details Modal */}
      {selectedTask && <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleTaskUpdate} />}
    </div>
  );
};

export default TaskList;
