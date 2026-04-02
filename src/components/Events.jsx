import React from "react";
import calendarImg from "../assets/calendar2026.png";
import TiltCard from "./TiltCard";

const Events = () => {
  // 2026 Holidays Data (Month: 0=Jan, 3=April, etc.)
  const allHolidays = [
    { date: "1st January", title: "New Year's Day", month: 0 },
    { date: "26th January", title: "Republic Day", month: 0 },
    { date: "15th February", title: "Maha Shivaratri", month: 1 },
    { date: "3rd March", title: "Holi Festival", month: 2 },
    { date: "2nd April", title: "Mahavir Jayanti", month: 3 },
    { date: "3rd April", title: "Good Friday", month: 3 },
    { date: "14th April", title: "Ambedkar Jayanti", month: 3 },
    { date: "1st May", title: "May Day / Labour Day", month: 4 },
    { date: "15th August", title: "Independence Day", month: 7 },
    { date: "2nd October", title: "Gandhi Jayanti", month: 9 },
    { date: "20th October", title: "Dussehra", month: 9 },
    { date: "8th November", title: "Diwali Night", month: 10 },
    { date: "25th December", title: "Christmas Day", month: 11 },
  ];

  const currentMonthIndex = new Date().getMonth();
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  // Current month ki holidays filter ho rahi hain
  const monthlyHolidays = allHolidays.filter(
    (h) => h.month === currentMonthIndex,
  );

  return (
    <section className="events-section">
      <div className="events-container">
        {/* Left Side: Image with Yellow Circle Background */}
        <div className="events-left">
          <div className="yellow-circle-bg"></div>
          <TiltCard calendarImg={calendarImg}/>
        </div>

        {/* Right Side: Auto-Update Holiday List */}
        <div className="events-right">
          <h2 className="events-title">
            Upcoming Events in {currentMonthName} 2026
          </h2>
          <div className="event-items">
            {monthlyHolidays.length > 0 ? (
              monthlyHolidays.map((event, index) => (
                <div className="event-card" key={index}>
                  <div className="event-icon">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div className="event-details">
                    <h4>{event.date}</h4>
                    <p>{event.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "#ccc", fontSize: "18px" }}>
                Is mahine koi chutti nahi hai, padhai par dhyan dein! 📚
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
