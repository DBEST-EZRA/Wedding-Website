import "./programme.css";

const Programme = () => {
  const events = [
    {
      time: "10:00 AM",
      title: "Guest Arrival",
      desc: "Guests arrive and are welcomed with refreshments and soft music.",
    },
    {
      time: "11:00 AM",
      title: "Wedding Ceremony",
      desc: "Exchange of vows between Brian Mosioma and Sheila Mogendi.",
    },
    {
      time: "12:30 PM",
      title: "Photo Session",
      desc: "Official couple and family photography session.",
    },
    {
      time: "2:00 PM",
      title: "Reception",
      desc: "Dinner, speeches, and celebration begins.",
    },
    {
      time: "6:00 PM",
      title: "Entertainment & Dance",
      desc: "Music, dancing, and celebration with guests.",
    },
  ];

  return (
    <section className="programme-section">
      <div className="container">
        <h2 className="section-title text-center">Order of Events</h2>

        <div className="timeline">
          {events.map((event, index) => (
            <div
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              key={index}
            >
              <div className="content">
                <span className="time">{event.time}</span>
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programme;
