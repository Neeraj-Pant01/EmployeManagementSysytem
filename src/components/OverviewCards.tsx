// import React from "react";

// const OverviewCards = () => {
//   const data = [
//     { title: "Attendance Status", value: "Present", color: "bg-green-500" },
//     { title: "Today's Work Hours", value: "6h 45m", color: "bg-blue-500" },
//     { title: "Pending Tasks", value: "3", color: "bg-yellow-500" },
//     { title: "Ongoing Projects", value: "5", color: "bg-purple-500" },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
//       {data.map((item, index) => (
//         <div
//           key={index}
//           className={`p-6 ${item.color} text-white rounded-lg shadow-lg`}
//         >
//           <h3 className="text-lg font-semibold">{item.title}</h3>
//           <p className="text-2xl font-bold mt-2">{item.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OverviewCards;


import React, { useState, useEffect } from "react";

const OverviewCards = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  const data = [
    { title: "Attendance Status", value: "Present", color: "bg-green-500" },
    { title: "Today's Work Hours", value: "6h 45m", color: "bg-blue-500" },
    { title: "Pending Tasks", value: "3", color: "bg-yellow-500" },
    { title: "Ongoing Projects", value: "5", color: "bg-purple-500" },
  ];

  return (
    <div className="mt-6">
      {/* Date and Time */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">📅 Date: {formattedDate}</h3>
        <h3 className="text-lg font-semibold">⏰ Time: {formattedTime}</h3>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {data.map((item, index) => (
          <div
            key={index}
            className={`p-6 ${item.color} text-white rounded-lg shadow-lg`}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;

