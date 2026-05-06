import { useEffect, useState } from "react";
import "./countdown.css";

const Countdown = () => {
  const weddingDate = new Date("2026-08-30T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section text-center">
      <div className="container">
        <h2 className="countdown-title">Countdown to Our Wedding</h2>
        <p className="countdown-subtitle">
          Every second brings us closer to forever
        </p>

        <div className="row justify-content-center mt-4">
          <div className="col-6 col-md-2">
            <div className="count-box">
              <h3>{timeLeft.days}</h3>
              <p>Days</p>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <div className="count-box">
              <h3>{timeLeft.hours}</h3>
              <p>Hours</p>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <div className="count-box">
              <h3>{timeLeft.minutes}</h3>
              <p>Minutes</p>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <div className="count-box">
              <h3>{timeLeft.seconds}</h3>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
