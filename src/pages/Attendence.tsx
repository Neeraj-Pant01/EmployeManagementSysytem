// import React, { useState, useEffect } from "react";

// export default function AttendancePage() {
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [clockInTime, setClockInTime] = useState<Date | null>(null);
//   const [workHours, setWorkHours] = useState(0);
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isClockedIn) {
//       interval = setInterval(() => {
//         setWorkHours((prev) => prev + 1);
//       }, 3600000); // 1 hour in milliseconds
//     }
//     return () => clearInterval(interval);
//   }, [isClockedIn]);

//   // Handle Clock In
//   const handleClockIn = () => {
//     setIsClockedIn(true);
//     setClockInTime(new Date());
//   };

//   // Handle Clock Out
//   const handleClockOut = () => {
//     setShowConfirmPopup(true);
//   };

//   // Confirm Clock Out
//   const confirmClockOut = () => {
//     setIsClockedIn(false);
//     setClockInTime(null);
//     setWorkHours(0);
//     setShowConfirmPopup(false);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {/* Attendance Section */}
//       <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold">Today's Attendance</h2>
//           {isClockedIn && clockInTime && (
//             <p className="text-gray-600">
//               Clocked in at:{" "}
//               <span className="font-semibold">
//                 {clockInTime.toLocaleTimeString()} | {clockInTime.toDateString()}
//               </span>
//             </p>
//           )}
//         </div>

//         {!isClockedIn ? (
//           <button
//             className="px-4 py-2 rounded bg-green-500 text-white"
//             onClick={handleClockIn}
//           >
//             Clock In
//           </button>
//         ) : (
//           <button
//             className="px-4 py-2 rounded bg-red-500 text-white"
//             onClick={handleClockOut}
//           >
//             Clock Out
//           </button>
//         )}
//       </div>

//       {/* Work Hours Tracker */}
//       {isClockedIn && (
//         <div className="mt-4 bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-lg font-semibold">Work Hours: {workHours} hrs</h3>
//         </div>
//       )}

//       {/* Clock Out Confirmation Popup */}
//       {showConfirmPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h3 className="text-lg font-semibold mb-4">
//               Are you sure you want to clock out?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={confirmClockOut}
//               >
//                 Yes, Clock Out
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//                 onClick={() => setShowConfirmPopup(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function AttendancePage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);
  const [workHours, setWorkHours] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState<{
    date: string;
    day: string;
    clockIn: string;
    clockOut: string;
    duration: string;
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn) {
      interval = setInterval(() => {
        setWorkMinutes((prev) => prev + 1);
        if (workMinutes === 59) {
          setWorkMinutes(0);
          setWorkHours((prev) => prev + 1);
        }
      }, 60000); // 1 minute interval
    }
    return () => clearInterval(interval);
  }, [isClockedIn, workMinutes]);

  // Handle Clock In
  const handleClockIn = () => {
    const now = new Date();
    setIsClockedIn(true);
    setClockInTime(now);
    setClockOutTime(null);
    setWorkHours(0);
    setWorkMinutes(0);
    setTodayAttendance(null); // Reset today's attendance
  };

  // Handle Clock Out
  const handleClockOut = () => {
    setShowConfirmPopup(true);
  };

  // Confirm Clock Out
  const confirmClockOut = () => {
    const now = new Date();
    setIsClockedIn(false);
    setClockOutTime(now);

    if (clockInTime) {
      const durationMs = now.getTime() - clockInTime.getTime();
      const totalMinutes = Math.floor(durationMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      // Store today's attendance
      setTodayAttendance({
        date: now.toDateString(),
        day: now.toLocaleDateString(undefined, { weekday: "long" }),
        clockIn: clockInTime.toLocaleTimeString(),
        clockOut: now.toLocaleTimeString(),
        duration: `${hours} hrs - ${minutes} mins`,
      });

      setWorkHours(hours);
      setWorkMinutes(minutes);
    }

    setShowConfirmPopup(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Attendance Section */}
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Today's Attendance</h2>
          {isClockedIn && clockInTime && (
            <p className="text-gray-600">
              Clocked in at:{" "}
              <span className="font-semibold">
                {clockInTime.toLocaleTimeString()} | {clockInTime.toDateString()}
              </span>
            </p>
          )}
        </div>

        {!isClockedIn ? (
          <button
            className="px-4 py-2 rounded bg-green-500 text-white"
            onClick={handleClockIn}
          >
            Clock In
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded bg-red-500 text-white"
            onClick={handleClockOut}
          >
            Clock Out
          </button>
        )}
      </div>

      {/* Work Hours Tracker */}
      {isClockedIn && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold">
            Work Hours: {workHours} hrs - {workMinutes} mins
          </h3>
        </div>
      )}

      {/* Display Today's Attendance After Clock Out */}
      {todayAttendance && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Today's Attendance Summary</h3>
          <p className="text-gray-600"><strong>Day:</strong> {todayAttendance.day}</p>
          <p className="text-gray-600"><strong>Date:</strong> {todayAttendance.date}</p>
          <p className="text-gray-600"><strong>Clock-In Time:</strong> {todayAttendance.clockIn}</p>
          <p className="text-gray-600"><strong>Clock-Out Time:</strong> {todayAttendance.clockOut}</p>
          <p className="text-gray-600"><strong>Total Work Time:</strong> {todayAttendance.duration}</p>
        </div>
      )}

      {/* Clock Out Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to clock out?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmClockOut}
              >
                Yes, Clock Out
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowConfirmPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
