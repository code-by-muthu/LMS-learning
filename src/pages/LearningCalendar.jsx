
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarDay, FaCheckCircle, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { gsap } from "gsap";
import Notification from "../components/Notification"; // Adjust path as needed

// Calendar Header Component
const CalendarHeader = ({ currentMonth, currentYear, onPrev, onNext, onMonthYearChange }) => {
  const handleMonthYearChange = (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    onMonthYearChange(month - 1, year); // month is 1-based in input, 0-based in state
  };

  return (
    <div className="flex justify-between items-center mb-4 relative z-10">
      <button
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-[#9B59FF] hover:text-[#1A1A1A] transition-all duration-300 shadow-[0_0_8px_rgba(255,0,255,0.4)]"
      >
        <FaChevronLeft />
      </button>
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-[#FF00FF] [text-shadow:0_0_12px_rgba(255,0,255,0.4)]">
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </h2>
        <input
          type="month"
          value={`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`}
          onChange={handleMonthYearChange}
          min={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`}
          className="p-1 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)] hover:bg-[rgba(155,89,255,0.2)]"
        />
      </div>
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-[#9B59FF] hover:text-[#1A1A1A] transition-all duration-300 shadow-[0_0_8px_rgba(255,0,255,0.4)]"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

// Calendar Grid Component
const CalendarGrid = ({ weeks, progressData, currentMonth, currentYear, today, onDayClick, eventTypes }) => {
  const isPastDate = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <div className="grid grid-cols-7 gap-2 text-sm relative z-10">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-[#00FFFF] [text-shadow:0_0_4px_rgba(0,255,255,0.4)] text-center font-semibold">
          {day}
        </div>
      ))}
      {weeks.map((week, wi) =>
        week.map((day, di) => {
          const dateKey = day ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : null;
          const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
          const isPast = day && isPastDate(day);
          const isStreak = day && progressData.streakDays.includes(day);
          const dayEvents = dateKey ? progressData.events[dateKey] || [] : [];

          return (
            <div
              key={`${wi}-${di}`}
              onClick={() => !isPast && day && onDayClick(day)}
              className={`min-h-[80px] rounded-lg p-2 border flex flex-col gap-1 transition-all duration-300
                ${isPast ? "opacity-60 bg-[#1A1A1A] border-gray-600 pointer-events-none" : "bg-[#1A1A1A] border-[#9B59FF] cursor-pointer hover:scale-105 hover:shadow-[0_0_12px_rgba(255,0,255,0.4)]"}
                ${isToday ? "bg-[#FF00FF] border-[#39FF14] shadow-[0_0_12px_rgba(255,0,255,0.4)] text-[#1A1A1A]" : ""}
                ${!day ? "bg-transparent border-transparent pointer-events-none" : ""}`}
            >
              {day && (
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${isToday ? "font-bold" : ""} ${isPast ? "text-gray-400" : ""}`}>{day}</span>
                  {isStreak && <FaCheckCircle className="text-[#39FF14] text-xs animate-pulse" />}
                </div>
              )}
              {dayEvents.slice(0, 2).map((e, i) => (
                <span
                  key={i}
                  className={`bg-[rgba(0,255,255,0.3)] text-[#F5F5F5] text-[9px] px-2 py-0.5 rounded-full truncate border border-[#9B59FF] ${isPast ? "line-through text-gray-400" : ""}`}
                  style={{ backgroundColor: `${eventTypes[e.type].color}30` }}
                >
                  {e.title}
                </span>
              ))}
              {dayEvents.length > 2 && (
                <span className="text-[9px] text-[#9B59FF]">+{dayEvents.length - 2}</span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

// Event Modal Component
const EventModal = ({ show, selectedDay, currentMonth, currentYear, modalMode, setModalMode, newEvent, setNewEvent, progressData, setProgressData, setNotification, closeModal, isDateReadOnly }) => {
  const [editEventIndex, setEditEventIndex] = useState(null);
  const eventTypes = {
    reminder: { color: "#00FFFF", label: "Reminder" },
    assignment: { color: "#39FF14", label: "Assignment" },
    quiz: { color: "#FF00FF", label: "Quiz" },
    session: { color: "#9B59FF", label: "Live Session" }
  };

  const getDateKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) {
      setNotification({ message: "Please fill in title, date, and start time", type: "error" });
      return;
    }
    const date = new Date(newEvent.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    if (date < today) {
      setNotification({ message: "Cannot schedule events in the past", type: "error" });
      return;
    }
    const dateKey = getDateKey(newEvent.date);
    const updatedEvents = { ...progressData.events, [dateKey]: [...(progressData.events[dateKey] || []), newEvent] };
    setProgressData({ ...progressData, events: updatedEvents });
    setNotification({ message: "Event scheduled successfully!", type: "success" });
    closeModal();
  };

  const editEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) {
      setNotification({ message: "Please fill in title, date, and start time", type: "error" });
      return;
    }
    const date = new Date(newEvent.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      setNotification({ message: "Cannot schedule events in the past", type: "error" });
      return;
    }
    const oldDateKey = getDateKey(newEvent.oldDate || newEvent.date);
    const dateKey = getDateKey(newEvent.date);
    const updatedEvents = { ...progressData.events };
    if (oldDateKey !== dateKey) {
      updatedEvents[oldDateKey].splice(editEventIndex, 1);
      if (updatedEvents[oldDateKey].length === 0) delete updatedEvents[oldDateKey];
    }
    if (!updatedEvents[dateKey]) updatedEvents[dateKey] = [];
    updatedEvents[dateKey].push(newEvent);
    setProgressData({ ...progressData, events: updatedEvents });
    setNotification({ message: "Event updated successfully!", type: "success" });
    closeModal();
  };

  const deleteEvent = (index) => {
    const dateKey = getDateKey(newEvent.date || `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`);
    const updatedEvents = { ...progressData.events };
    updatedEvents[dateKey].splice(index, 1);
    if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];
    setProgressData({ ...progressData, events: updatedEvents });
    setNotification({ message: "Event deleted successfully!", type: "success" });
  };

  useEffect(() => {
    if (show) {
      gsap.fromTo(".modal-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }, [show]);

  return show ? (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="modal-content bg-[#1A1A1A] p-6 rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.5)] max-w-lg w-full relative border border-[#9B59FF]">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-[#FF00FF] hover:text-[#39FF14] text-xl"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-[#9B59FF] mb-4 [text-shadow:0_0_8px_rgba(255,0,255,0.4)]">
          {modalMode === "view" ? `Events for ${new Date(`${currentYear}-${currentMonth + 1}-${selectedDay}`).toLocaleDateString()}` : modalMode === "add" ? "Create Event" : "Edit Event"}
        </h3>
        {modalMode === "view" ? (
          <div className="space-y-3">
            {(progressData.events[`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`] || []).map((e, i) => (
              <div key={i} className="flex justify-between items-start bg-[#0F0F1A] p-3 rounded-lg border border-[#9B59FF] shadow-[0_0_5px_rgba(0,255,255,0.2)]">
                <div>
                  <span className="text-sm font-semibold text-[#F5F5F5]">{e.title}</span>
                  <span className="text-xs text-[#00FFFF] block mt-1">{eventTypes[e.type].label} {e.startTime && `at ${e.startTime}`}{e.endTime && ` - ${e.endTime}`}</span>
                  {e.description && <p className="text-xs text-gray-300 mt-1">{e.description}</p>}
                </div>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => { setModalMode("edit"); setEditEventIndex(i); setNewEvent({ ...e, oldDate: e.date }); }} className="text-[#39FF14] hover:text-[#00FFE5]">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteEvent(i)} className="text-[#FF3131] hover:text-[#FF6F00]">
                    <FaTrash />
                  </button>
                </div>
              </div>
            )) || <p className="text-[#F5F5F5] opacity-80 text-sm">No events for this day.</p>}
            {!isDateReadOnly && (
              <button
                onClick={() => { setModalMode("add"); setNewEvent({ title: "", type: "reminder", date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`, startTime: "", endTime: "", description: "" }); }}
                className="mt-4 w-full px-3 py-2 bg-[#FF00FF] text-[#1A1A1A] rounded-full text-sm font-semibold hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] transition-all duration-300"
              >
                Add New Event
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); modalMode === "add" ? addEvent() : editEvent(); }} className="space-y-4">
            <div>
              <label className="text-xs text-[#00FFFF] mb-1 block">Title</label>
              <input
                type="text"
                placeholder="e.g., React Lesson"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)]"
              />
            </div>
            <div>
              <label className="text-xs text-[#00FFFF] mb-1 block">Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                readOnly={isDateReadOnly}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-2 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm focus:outline-none ${isDateReadOnly ? "cursor-not-allowed opacity-70" : "focus:shadow-[0_0_8px_rgba(255,0,255,0.4)]"}`}
              />
            </div>
            <div>
              <label className="text-xs text-[#00FFFF] mb-1 block">Type</label>
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                className="w-full p-2 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm"
              >
                {Object.keys(eventTypes).map((type) => (
                  <option key={type} value={type}>{eventTypes[type].label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-[#00FFFF] mb-1 block">Start Time</label>
                <input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  className="w-full p-2 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-[#00FFFF] mb-1 block">End Time (optional)</label>
                <input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  className="w-full p-2 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)]"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#00FFFF] mb-1 block">Description (optional)</label>
              <textarea
                placeholder="Add details..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full p-2 bg-[#0F0F1A] border border-[#9B59FF] rounded-lg text-[#F5F5F5] text-sm focus:outline-none focus:shadow-[0_0_8px_rgba(255,0,255,0.4)]"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 bg-[#39FF14] text-[#1A1A1A] rounded-full text-sm font-semibold hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all duration-300"
            >
              {modalMode === "add" ? "Create Event" : "Update Event"}
            </button>
          </form>
        )}
      </div>
    </div>
  ) : null;
};

// Main Learning Calendar Component
const LearningCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "reminder",
    date: "",
    startTime: "",
    endTime: "",
    description: ""
  });
  const [notification, setNotification] = useState({ message: "", type: "success" });
  const [progressData, setProgressData] = useState({
    streakDays: [3, 4, 5, 10, 15, 20, 21],
    events: {
      "2025-08-03": [{ title: "React Lesson", type: "reminder", date: "2025-08-03", startTime: "10:00", endTime: "", description: "" }],
      "2025-08-05": [{ title: "JavaScript Quiz", type: "quiz", date: "2025-08-05", startTime: "14:00", endTime: "15:00", description: "Chapter 3 quiz" }],
      "2025-08-15": [
        { title: "AI Course Module", type: "assignment", date: "2025-08-15", startTime: "", endTime: "", description: "Submit by EOD" },
        { title: "Assignment Due", type: "reminder", date: "2025-08-15", startTime: "17:00", endTime: "", description: "" }
      ]
    }
  });

  const eventTypes = {
    reminder: { color: "#00FFFF", label: "Reminder" },
    assignment: { color: "#39FF14", label: "Assignment" },
    quiz: { color: "#FF00FF", label: "Quiz" },
    session: { color: "#9B59FF", label: "Live Session" }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const weeks = [];
  let currentDay = 1 - firstDayOfMonth;
  while (currentDay <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(currentDay > 0 && currentDay <= daysInMonth ? currentDay : null);
      currentDay++;
    }
    weeks.push(week);
  }

  const handlePrev = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    if (newYear < today.getFullYear() || (newYear === today.getFullYear() && newMonth < today.getMonth())) {
      setNotification({ message: "Cannot navigate to past months", type: "error" });
      return;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNext = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) setCurrentYear(currentYear + 1);
  };

  const handleMonthYearChange = (month, year) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalMode("view");
    setNewEvent({
      title: "",
      type: "reminder",
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      startTime: "",
      endTime: "",
      description: ""
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMode("view");
    setNewEvent({
      title: "",
      type: "reminder",
      date: "",
      startTime: "",
      endTime: "",
      description: ""
    });
  };

  return (
    <div className="bg-[#0F0F1A] text-[#F5F5F5] p-5 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.4)] relative overflow-hidden">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "success" })}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-[#FF00FF] rounded-full top-3 left-3 animate-float"></div>
        <div className="absolute w-2 h-2 bg-[#39FF14] rounded-full bottom-3 right-3 animate-float animation-delay-1000"></div>
      </div>
      <CalendarHeader
        currentMonth={currentMonth}
        currentYear={currentYear}
        onPrev={handlePrev}
        onNext={handleNext}
        onMonthYearChange={handleMonthYearChange}
      />
      <CalendarGrid
        weeks={weeks}
        progressData={progressData}
        currentMonth={currentMonth}
        currentYear={currentYear}
        today={today}
        onDayClick={handleDayClick}
        eventTypes={eventTypes}
      />
      <div className="flex justify-center gap-3 mt-4 relative z-10">
        <button
          onClick={() => {
            setCurrentMonth(today.getMonth());
            setCurrentYear(today.getFullYear());
            setSelectedDay(null); // Reset selected day
          }}
          className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-[#9B59FF] rounded-full hover:bg-[#9B59FF] hover:text-[#1A1A1A] text-sm"
        >
          <FaCalendarDay /> Today
        </button>
        <button
          onClick={() => {
            setSelectedDay(null); // Reset to allow editable date
            setModalMode("add");
            setNewEvent({
              title: "",
              type: "reminder",
              date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
              startTime: "",
              endTime: "",
              description: ""
            });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-3 py-2 bg-[#39FF14] text-[#1A1A1A] rounded-full text-sm font-semibold hover:shadow-[0_0_12px_rgba(57,255,20,0.5)]"
        >
          <FaPlus /> Schedule Event
        </button>
      </div>
      <EventModal
        show={showModal}
        selectedDay={selectedDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
        modalMode={modalMode}
        setModalMode={setModalMode}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        progressData={progressData}
        setProgressData={setProgressData}
        setNotification={setNotification}
        closeModal={closeModal}
        isDateReadOnly={modalMode === "add" && selectedDay !== null}
      />
    </div>
  );
};

export default LearningCalendar;
