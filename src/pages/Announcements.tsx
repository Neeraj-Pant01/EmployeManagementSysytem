import React, { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  category: "Important" | "Event" | "Policy Update" | "General";
  date: string;
  content: string;
  attachments?: string[];
}

const announcements: Announcement[] = [
  { id: 1, title: "Office Closure on April 15th", category: "Important", date: "March 12, 2025", content: "The office will be closed on April 15th due to maintenance...", attachments: ["/docs/closure-notice.pdf"] },
  { id: 2, title: "Company Annual Meetup 2025", category: "Event", date: "March 10, 2025", content: "Join us for the annual meetup event on May 5th..." },
  { id: 3, title: "Updated Leave Policy", category: "Policy Update", date: "March 5, 2025", content: "We have updated our leave policy with new flexible options..." },
];

const AnnouncementsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Important" | "Event" | "Policy Update" | "General">("All");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const filteredAnnouncements = selectedCategory === "All" ? announcements : announcements.filter(a => a.category === selectedCategory);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">📢 Announcements</h2>

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
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition" onClick={() => setSelectedAnnouncement(announcement)}>
            <h3 className="font-semibold">{announcement.title}</h3>
            <p className="text-gray-600 text-sm">{announcement.date} • <span className="font-medium">{announcement.category}</span></p>
          </div>
        ))}
      </div>

      {/* Announcement Details Popup */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="font-semibold">{selectedAnnouncement.title}</h3>
            <p className="text-gray-500 text-sm">{selectedAnnouncement.date} • <span className="font-medium">{selectedAnnouncement.category}</span></p>
            <p className="mt-4">{selectedAnnouncement.content}</p>

            {selectedAnnouncement.attachments?.map((file, index) => (
              <a key={index} href={file} download className="block mt-3 text-blue-600 underline">📎 Download Attachment</a>
            ))}

            <button onClick={() => setSelectedAnnouncement(null)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
