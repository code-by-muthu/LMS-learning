import React, { createContext, useState } from "react";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const today = new Date();
  const [progressData, setProgressData] = useState({
    streakDays: [3, 4, 5, 10, 15, 20, 21],
    events: {
      "2025-08-03": [{ title: "React Lesson", type: "reminder", date: "2025-08-03", startTime: "10:00", endTime: "", description: "" }],
      "2025-08-05": [{ title: "JavaScript Quiz", type: "quiz", date: "2025-08-05", startTime: "14:00", endTime: "15:00", description: "Chapter 3 quiz" }],
      "2025-08-15": [
        { title: "AI Course Module", type: "assignment", date: "2025-08-15", startTime: "", endTime: "", description: "Submit by EOD" },
        { title: "Assignment Due", type: "reminder", date: "2025-08-15", startTime: "17:00", endTime: "", description: "" }
      ],
      // Sample events for today (2025-08-30)
      "2025-08-30": [
        { title: "JavaScript Advanced Concepts", type: "session", date: "2025-08-30", startTime: "10:00", endTime: "", description: "" },
        { title: "React Assignment Due", type: "assignment", date: "2025-08-30", startTime: "14:00", endTime: "", description: "" },
        { title: "Data Structures Quiz", type: "quiz", date: "2025-08-30", startTime: "16:00", endTime: "", description: "" }
      ]
    }
  });

  return (
    <CalendarContext.Provider value={{ progressData, setProgressData }}>
      {children}
    </CalendarContext.Provider>
  );
};