import React, { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  category: "Important" | "Event" | "Policy Update" | "General";
  date: string;
  content: string;
  attachments?: string[];
}

const initialAnnouncements: Announcement[] = [
  { id: 1, title: "Office Closure on April 15th", category: "Important", date: "March 12, 2025", content: "The office will be closed on April 15th due to maintenance...", attachments: ["/docs/closure-notice.pdf"] },
  { id: 2, title: "Company Annual Meetup 2025", category: "Event", date: "March 10, 2025", content: "Join us for the annual meetup event on May 5th..." },
  { id: 3, title: "Updated Leave Policy", category: "Policy Update", date: "March 5, 2025", content: "We have updated our leave policy with new flexible options..." },
];

const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Important" | "Event" | "Policy Update" | "General">("All");
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState<Announcement | null>(null);
  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({ title: "", category: "Important", content: "" });

  const filteredAnnouncements = selectedCategory === "All" ? announcements : announcements.filter(a => a.category === selectedCategory);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  // Submit announcement
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.content) return;

    if (newAnnouncement.id) {
      setAnnouncements(announcements.map(a => (a.id === newAnnouncement.id ? { ...a, ...newAnnouncement } : a)));
    } else {
      const newEntry: Announcement = {
        id: announcements.length + 1,
        title: newAnnouncement.title as string,
        category: newAnnouncement.category as any,
        date: new Date().toLocaleDateString(),
        content: newAnnouncement.content as string,
        attachments: newAnnouncement.attachments || [],
      };
      setAnnouncements([...announcements, newEntry]);
    }
    setShowPopup(false);
    setNewAnnouncement({ title: "", category: "Important", content: "" });
  };

  // Open edit popup
  const handleEdit = (announcement: Announcement) => {
    setNewAnnouncement(announcement);
    setShowPopup(true);
  };

  // Delete an announcement
  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">📢 Manage Announcements</h2>

      {/* Category Filters */}
      <div className="flex gap-4 mb-4">
        {["All", "Important", "Event", "Policy Update", "General"].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as any)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {category}
          </button>
        ))}
        <button onClick={() => setShowPopup(true)} className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md">➕ Add Announcement</button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition"
            onClick={() => setShowDetails(announcement)}
          >
            <h3 className="font-semibold">{announcement.title}</h3>
            <p className="text-gray-600 text-sm">{announcement.date} • <span className="font-medium">{announcement.category}</span></p>
          </div>
        ))}
      </div>

      {/* View Announcement Details Popup */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="font-semibold">{showDetails.title}</h3>
            <p className="text-gray-500 text-sm">{showDetails.date} • <span className="font-medium">{showDetails.category}</span></p>
            <p className="mt-4">{showDetails.content}</p>

            {showDetails.attachments?.map((file, index) => (
              <a key={index} href={file} download className="block mt-3 text-blue-600 underline">📎 Download Attachment</a>
            ))}

            <div className="mt-4 flex justify-between">
              <button onClick={() => handleEdit(showDetails)} className="px-4 py-2 bg-blue-500 text-white rounded-md">✏️ Edit</button>
              <button onClick={() => handleDelete(showDetails.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">🗑 Delete</button>
              <button onClick={() => setShowDetails(null)} className="px-4 py-2 bg-gray-400 text-white rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Announcement Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="font-semibold mb-3">{newAnnouncement.id ? "Edit Announcement" : "New Announcement"}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="title" value={newAnnouncement.title || ""} onChange={handleInputChange} placeholder="Title" className="w-full p-2 border rounded" required />
              <select name="category" value={newAnnouncement.category} onChange={handleInputChange} className="w-full p-2 border rounded">
                <option value="Important">Important</option>
                <option value="Event">Event</option>
                <option value="Policy Update">Policy Update</option>
                <option value="General">General</option>
              </select>
              <textarea name="content" value={newAnnouncement.content || ""} onChange={handleInputChange} placeholder="Content" className="w-full p-2 border rounded" required />
              <div className="flex justify-between">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">{newAnnouncement.id ? "Update" : "Submit"}</button>
                <button type="button" onClick={() => setShowPopup(false)} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
