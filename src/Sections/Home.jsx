import { useState, useEffect, useRef } from "react";

// ── Icon components (inline SVG, no emoji) ──────────────────────────────────
const Icon = ({
  d,
  size = 20,
  color = "currentColor",
  stroke = false,
  strokeW = 1.5,
  viewBox = "0 0 24 24",
}) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill={stroke ? "none" : color}
    stroke={stroke ? color : "none"}
    strokeWidth={strokeW}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const Icons = {
  heart:
    "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z",
  clock:
    "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 100-16 8 8 0 000 16zm1-8.414l3.243 3.243-1.415 1.414L11 12.414V7h2v4.586z",
  mapPin:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  camera:
    "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  phone:
    "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  mail: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  ring: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4a6 6 0 010 12A6 6 0 0112 6z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12.004 2.003C6.472 2.003 2 6.474 2 12.003c0 1.774.463 3.437 1.27 4.881L2 22l5.236-1.37A9.96 9.96 0 0012.004 22c5.528 0 9.996-4.468 9.996-9.997 0-5.528-4.468-9.997-9.996-9.997z",
  chevronDown: "M6 9l6 6 6-6",
  menu: "M3 12h18M3 6h18M3 18h18",
  close: "M18 6L6 18M6 6l12 12",
  users:
    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  gift: "M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  music:
    "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zM21 16a3 3 0 11-6 0 3 3 0 016 0z",
};

// ── Petal animation ──────────────────────────────────────────────────────────
const Petals = () => {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: `${10 + Math.random() * 14}px`,
    opacity: 0.4 + Math.random() * 0.4,
  }));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-40px) rotate(0deg) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(60px); opacity: 0; }
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: 0,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle at 30% 30%, #f4a0b0, #c0385a)",
            borderRadius: "50% 0 50% 0",
            animation: `petalFall ${p.duration} ${p.delay} infinite linear`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

// ── Countdown ────────────────────────────────────────────────────────────────
// Live countdown — recalculates every second, always accurate to the
// wall clock (no drift from setInterval timing since we always diff
// against "now" rather than incrementing a counter).
const WEDDING_DATE = "2026-08-30T10:00:00";

const useCountdown = (target) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0, finished: true });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        finished: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
};

// ── Intersection observer hook ───────────────────────────────────────────────
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// ── RSVP Form ────────────────────────────────────────────────────────────────
const RSVPForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    attendance: "yes",
    guests: "1",
  });
  const [sent, setSent] = useState(false);
  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  if (sent)
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: 48, color: "#C9A96E", marginBottom: 16 }}>
          <Icon d={Icons.heart} size={56} color="#C9A96E" />
        </div>
        <h4
          style={{ color: "#6B0032", fontFamily: "'Playfair Display', serif" }}
        >
          Thank you, {form.name}!
        </h4>
        <p style={{ color: "#555" }}>
          We can't wait to celebrate with you. See you on August 30th, 2026!
        </p>
      </div>
    );
  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#0A1931" }}>
          Full Name
        </label>
        <input
          className="form-control form-control-lg"
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Your full name"
          required
          style={{ borderColor: "#6B0032", borderRadius: 8 }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#0A1931" }}>
          Phone Number
        </label>
        <input
          className="form-control form-control-lg"
          name="phone"
          value={form.phone}
          onChange={handle}
          placeholder="+254 7XX XXX XXX"
          required
          style={{ borderColor: "#6B0032", borderRadius: 8 }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold" style={{ color: "#0A1931" }}>
          Will you attend?
        </label>
        <select
          className="form-select form-select-lg"
          name="attendance"
          value={form.attendance}
          onChange={handle}
          style={{ borderColor: "#6B0032", borderRadius: 8 }}
        >
          <option value="yes">Joyfully Accept 🎊</option>
          <option value="no">Regretfully Decline</option>
        </select>
      </div>
      {form.attendance === "yes" && (
        <div className="mb-4">
          <label
            className="form-label fw-semibold"
            style={{ color: "#0A1931" }}
          >
            Number of Guests
          </label>
          <select
            className="form-select form-select-lg"
            name="guests"
            value={form.guests}
            onChange={handle}
            style={{ borderColor: "#6B0032", borderRadius: 8 }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        type="submit"
        className="btn btn-lg w-100 text-white fw-bold"
        style={{
          background: "linear-gradient(135deg, #6B0032, #0A1931)",
          borderRadius: 50,
          letterSpacing: 1,
        }}
      >
        Send RSVP
      </button>
    </form>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const countdown = useCountdown(WEDDING_DATE);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const [storyRef, storyVisible] = useReveal();
  const [eventsRef, eventsVisible] = useReveal();
  const [countdownRef, countdownVisible] = useReveal();
  const [memoriesRef, memoriesVisible] = useReveal();
  const [rsvpRef, rsvpVisible] = useReveal();

  const navLinks = [
    { label: "Our Story", id: "story" },
    { label: "Programme", id: "events" },
    { label: "Countdown", id: "countdown" },
    { label: "Pictorial", id: "memories" },
    { label: "RSVP", id: "rsvp" },
    { label: "Find Us", id: "map" },
  ];

  const events = [
    {
      time: "10:00 AM",
      title: "Guest Arrival",
      desc: "Guests arrive and are welcomed with soft music & presentations.",
      icon: Icons.users,
    },
    {
      time: "11:00 AM",
      title: "Wedding Ceremony",
      desc: "Exchange of vows between Brian and Sheila.",
      icon: Icons.ring,
    },
    {
      time: "12:30 PM",
      title: "Photo Session",
      desc: "Official couple and family photography session.",
      icon: Icons.camera,
    },
    {
      time: "2:00 PM",
      title: "Reception",
      desc: "Speeches and celebration begins.",
      icon: Icons.gift,
    },
    {
      time: "6:00 PM",
      title: "Entertainment & Dance",
      desc: "Music, dancing, and celebration with guests.",
      icon: Icons.music,
    },
  ];

  const memories = [
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570919/9_xxjct1.png",
      label: "Bride & Bridegroom",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570917/7_tvmido.png",
      label: "Cellin Nyaboke",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570912/5_efkvao.png",
      label: "Christine Nyakambi",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570911/8_vnexsk.png",
      label: "Living Caleb",
    },

    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570934/1_dlezo6.png",
      label: "Samantha Moraa",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570933/4_f7tmmf.png",
      label: "Madam Vannie",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570928/3_luum8q.png",
      label: "Sharon Kwamboka",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570926/2_qjwy9h.png",
      label: "Deborah Onyangi",
    },
    {
      src: "https://res.cloudinary.com/dxrjntrjb/image/upload/v1782570925/6_yirjvb.png",
      label: "Zainab",
    },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&family=Dancing+Script:wght@600&display=swap');

    :root {
      --maroon: #6B0032;
      --navy: #0A1931;
      --gold: #C9A96E;
      --gray: #8E8E9A;
      --light: #F8F4F0;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Lato', sans-serif; background: #fff; margin: 0; overflow-x: hidden; }

    /* Navbar */
    .wb-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 999;
      transition: all 0.4s ease;
      padding: 16px 0;
    }
    .wb-nav.scrolled {
      background: rgba(10,25,49,0.97);
      backdrop-filter: blur(12px);
      padding: 10px 0;
      box-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }
    .wb-nav-link {
      color: rgba(255,255,255,0.85) !important;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 50px;
      transition: all 0.3s;
      text-decoration: none;
      cursor: pointer;
    }
    .wb-nav-link:hover {
      color: #fff !important;
      background: rgba(201,169,110,0.2);
    }

    /* Hero */
    .wb-hero {
      min-height: 100vh;
      background: linear-gradient(160deg, #0A1931 0%, #2a0618 50%, #6B0032 100%);
      position: relative;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .wb-hero::before {
      content: '';
      position: absolute; inset: 0;
      background: url('https://picsum.photos/seed/weddingbg/1600/900') center/cover no-repeat;
      opacity: 0.12;
    }
    .wb-hero-content { position: relative; z-index: 2; text-align: center; padding: 20px; }
    .wb-script { font-family: 'Dancing Script', cursive; color: var(--gold); font-size: clamp(20px,4vw,32px); }
    .wb-display { font-family: 'Playfair Display', serif; color: #fff; font-size: clamp(36px,7vw,88px); font-weight: 700; line-height: 1.1; }
    .wb-display em { font-style: italic; color: var(--gold); }
    .wb-quote { font-family: 'Playfair Display', serif; font-style: italic; color: rgba(255,255,255,0.7); font-size: clamp(14px,2vw,18px); margin: 20px auto; max-width: 560px; }
    .wb-date { font-size: clamp(28px,5vw,56px); font-weight: 700; color: var(--gold); letter-spacing: 4px; font-family: 'Playfair Display', serif; }
    .wb-divider { display: flex; align-items: center; gap: 16px; justify-content: center; margin: 20px 0; }
    .wb-divider-line { height: 1px; width: 80px; background: linear-gradient(to right, transparent, var(--gold)); }
    .wb-divider-line.rev { background: linear-gradient(to left, transparent, var(--gold)); }

    /* Buttons */
    .btn-maroon {
      background: linear-gradient(135deg, var(--maroon), #9a004a);
      color: #fff; border: none; border-radius: 50px;
      padding: 14px 40px; font-weight: 700; letter-spacing: 1.5px;
      font-size: 14px; text-transform: uppercase;
      transition: all 0.3s; box-shadow: 0 4px 20px rgba(107,0,50,0.4);
      cursor: pointer;
    }
    .btn-maroon:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(107,0,50,0.6); }
    .btn-gold {
      background: linear-gradient(135deg, var(--gold), #b8873a);
      color: #fff; border: none; border-radius: 50px;
      padding: 14px 40px; font-weight: 700; letter-spacing: 1.5px;
      font-size: 14px; text-transform: uppercase;
      transition: all 0.3s; box-shadow: 0 4px 20px rgba(201,169,110,0.4);
      cursor: pointer;
    }
    .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,169,110,0.6); }

    /* Section */
    .wb-section { padding: 100px 0; }
    .wb-section-alt { background: var(--light); }
    .wb-section-dark { background: var(--navy); color: #fff; }
    .wb-section-maroon { background: linear-gradient(135deg, var(--maroon), #4a0022); color: #fff; }
    .wb-section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(28px,4vw,48px);
      font-weight: 700;
      margin-bottom: 8px;
    }
    .wb-section-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      color: var(--gray);
      font-size: 16px;
      margin-bottom: 48px;
    }
    .wb-section-subtitle.light { color: rgba(255,255,255,0.6); }

    /* Story cards */
    .story-card {
      background: #fff;
      border-radius: 20px;
      padding: 36px 28px;
      box-shadow: 0 4px 30px rgba(107,0,50,0.08);
      border-top: 4px solid var(--maroon);
      transition: transform 0.3s, box-shadow 0.3s;
      height: 100%;
    }
    .story-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(107,0,50,0.15); }
    .story-icon { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--maroon), #9a004a); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }

    /* Timeline */
    .wb-timeline { position: relative; }
    .wb-timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--gold), var(--maroon)); transform: translateX(-50%); }
    @media (max-width: 767px) { .wb-timeline::before { left: 32px; } }
    .timeline-item { position: relative; margin-bottom: 48px; }
    .timeline-dot {
      position: absolute; left: 50%; top: 24px;
      width: 16px; height: 16px; border-radius: 50%;
      background: var(--gold); border: 3px solid var(--navy);
      transform: translateX(-50%);
      z-index: 2;
    }
    @media (max-width: 767px) { .timeline-dot { left: 32px; } }
    .timeline-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(201,169,110,0.3);
      border-radius: 16px;
      padding: 24px;
      width: 42%;
      transition: all 0.3s;
    }
    .timeline-card:hover { background: rgba(201,169,110,0.08); transform: scale(1.02); }
    .timeline-card.left { margin-right: auto; margin-left: 0; }
    .timeline-card.right { margin-left: auto; margin-right: 0; }
    @media (max-width: 767px) { .timeline-card { width: calc(100% - 70px); margin-left: 64px !important; margin-right: 0 !important; } }
    .tl-time { color: var(--gold); font-weight: 700; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
    .tl-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: #fff; margin: 6px 0; }
    .tl-desc { color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.6; }

    /* Countdown */
    .countdown-box {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(201,169,110,0.4);
      border-radius: 20px;
      padding: 32px 20px;
      transition: transform 0.3s;
    }
    .countdown-box:hover { transform: scale(1.05); background: rgba(201,169,110,0.1); }
    .countdown-num { font-family: 'Playfair Display', serif; font-size: clamp(44px,7vw,80px); font-weight: 700; color: var(--gold); line-height: 1; }
    .countdown-label { color: rgba(255,255,255,0.6); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-top: 8px; }

    /* Memories grid */
    .memory-card {
      position: relative; overflow: hidden; border-radius: 16px;
      cursor: pointer; aspect-ratio: 4/3;
    }
    .memory-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .memory-card:hover img { transform: scale(1.1); }
    .memory-overlay {
      position: absolute; inset: 0; background: linear-gradient(to top, rgba(107,0,50,0.8), transparent);
      opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 20px;
    }
    .memory-card:hover .memory-overlay { opacity: 1; }
    .memory-label { color: #fff; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; }

    /* Contribution */
    .contribution-box {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(201,169,110,0.3);
      border-radius: 20px;
      padding: 32px;
    }
    .mpesa-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); letter-spacing: 4px; }

    /* Reveal animation */
    .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }

    /* Scroll caret */
    @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
    .scroll-caret { animation: bounce 2s infinite; }

    /* Footer */
    .wb-footer { background: #050d1a; color: rgba(255,255,255,0.7); padding: 60px 0 0; }
    .wb-footer-brand { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--gold); }
    .wb-footer-divider { border-color: rgba(255,255,255,0.1); margin: 40px 0; }
    .etech-cta {
      background: linear-gradient(135deg, #0d7b3e, #0a5c2e);
      border-radius: 20px; padding: 40px; text-align: center;
      border: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 40px;
    }
    .etech-title { font-family: 'Playfair Display', serif; font-size: 24px; color: #fff; font-weight: 700; margin-bottom: 8px; }
    .wa-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: #25D366; color: #fff; border: none; border-radius: 50px;
      padding: 14px 32px; font-weight: 700; font-size: 15px;
      cursor: pointer; transition: all 0.3s; text-decoration: none;
      box-shadow: 0 4px 20px rgba(37,211,102,0.4);
    }
    .wa-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,211,102,0.6); color: #fff; }
    .service-pill {
      display: inline-block; background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15); border-radius: 50px;
      padding: 6px 16px; font-size: 13px; color: rgba(255,255,255,0.8);
      margin: 4px;
    }

    /* Pulse ring on hero date */
    @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
    .pulse-dot { position: relative; display: inline-block; }
    .pulse-dot::before {
      content: ''; position: absolute; inset: -8px;
      border: 2px solid var(--gold); border-radius: 50%;
      animation: pulse-ring 2s infinite;
    }

    /* Map iframe */
    .map-wrapper { border-radius: 20px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.2); }
  `;

  return (
    <>
      <style>{css}</style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css"
      />

      {/* ── NAVBAR ── */}
      <nav className={`wb-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <span className="wb-script" style={{ fontSize: 22 }}>
              S &amp; B
            </span>
            <div className="d-none d-md-flex gap-1">
              {navLinks.map((l) => (
                <span
                  key={l.id}
                  className="wb-nav-link"
                  onClick={() => scrollTo(l.id)}
                >
                  {l.label}
                </span>
              ))}
            </div>
            <button
              className="btn p-0 d-md-none"
              style={{ background: "none", border: "none" }}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Icon
                d={menuOpen ? Icons.close : Icons.menu}
                size={24}
                color="#fff"
                stroke
                strokeW={2}
              />
            </button>
          </div>
          {/* Mobile menu */}
          {menuOpen && (
            <div
              className="d-md-none py-3"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginTop: 12,
              }}
            >
              {navLinks.map((l) => (
                <div
                  key={l.id}
                  className="wb-nav-link d-block py-2"
                  onClick={() => scrollTo(l.id)}
                  style={{ textAlign: "center", display: "block" }}
                >
                  {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="wb-hero">
        <Petals />
        <div className="wb-hero-content">
          <p className="wb-script mb-2">Together with their families</p>
          <div className="wb-divider">
            <div className="wb-divider-line" />
            <Icon d={Icons.heart} size={18} color="#C9A96E" />
            <div className="wb-divider-line rev" />
          </div>
          <h1 className="wb-display mb-0">
            <em>Sheila</em>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 20,
              margin: "8px 0",
              letterSpacing: 6,
              fontFamily: "'Lato',sans-serif",
              fontWeight: 300,
            }}
          >
            &amp;
          </p>
          <h1 className="wb-display mb-0">
            <em>Brian</em>
          </h1>
          <p className="wb-quote mt-3">
            "Two hearts, one love, and a lifetime of memories begins here."
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              letterSpacing: 2,
              fontSize: 13,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            invite you to their Happily Ever After
          </p>
          <div className="wb-date my-4">30th August 2026</div>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn-maroon" onClick={() => scrollTo("rsvp")}>
              RSVP Now
            </button>
            <button className="btn-gold" onClick={() => scrollTo("events")}>
              View Programme
            </button>
          </div>
          <div
            className="scroll-caret mt-5"
            onClick={() => scrollTo("story")}
            style={{ cursor: "pointer" }}
          >
            <Icon
              d={Icons.chevronDown}
              size={28}
              color="rgba(255,255,255,0.5)"
              stroke
              strokeW={2}
              viewBox="0 0 24 24"
            />
          </div>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className="wb-section">
        <div className="container" ref={storyRef}>
          <div
            className={`text-center mb-5 reveal ${storyVisible ? "visible" : ""}`}
          >
            <p
              className="wb-script"
              style={{ color: "var(--maroon)", fontSize: 22 }}
            >
              Our Story
            </p>
            <h2 className="wb-section-title" style={{ color: "var(--navy)" }}>
              Three moments. One love. A lifetime ahead.
            </h2>
            <p className="wb-section-subtitle">
              The journey that led us to forever
            </p>
            <div className="wb-divider">
              <div
                className="wb-divider-line"
                style={{
                  background:
                    "linear-gradient(to right,transparent,var(--maroon))",
                }}
              />
              <Icon d={Icons.heart} size={16} color="var(--maroon)" />
              <div
                className="wb-divider-line rev"
                style={{
                  background:
                    "linear-gradient(to left,transparent,var(--maroon))",
                }}
              />
            </div>
          </div>
          <div className="row g-4">
            {[
              {
                title: "How We Met",
                icon: Icons.star,
                delay: 0,
                text: "We first crossed paths in a moment we never expected. What started as a simple introduction slowly became the beginning of something beautiful — a story neither of us had planned but both of us cherish.",
              },
              {
                title: "Our Journey",
                icon: Icons.heart,
                delay: 150,
                text: "Through laughter, growth, and shared dreams, we discovered a bond that only grew stronger with time. Every challenge made us closer, every joy doubled when shared.",
              },
              {
                title: "Forever Begins",
                icon: Icons.ring,
                delay: 300,
                text: "Now we step into forever, grateful for every moment that led us here and excited for what lies ahead — hand in hand, heart to heart, for the rest of our lives.",
              },
            ].map((s, i) => (
              <div key={i} className="col-md-4">
                <div
                  className={`story-card text-center reveal ${storyVisible ? "visible" : ""}`}
                  style={{ transitionDelay: `${s.delay}ms` }}
                >
                  <div className="story-icon">
                    <Icon d={s.icon} size={26} color="#fff" />
                  </div>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      color: "var(--navy)",
                      fontSize: 22,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--gray)",
                      lineHeight: 1.8,
                      fontSize: 15,
                    }}
                  >
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER OF EVENTS ── */}
      <section
        id="events"
        className="wb-section wb-section-dark"
        ref={eventsRef}
      >
        <div className="container">
          <div
            className={`text-center mb-5 reveal ${eventsVisible ? "visible" : ""}`}
          >
            <p
              className="wb-script"
              style={{ color: "var(--gold)", fontSize: 22 }}
            >
              Programme
            </p>
            <h2 className="wb-section-title text-white">Order of Events</h2>
            <p className="wb-section-subtitle light">
              August 30th, 2026 — Kisii
            </p>
            <div className="wb-divider">
              <div
                className="wb-divider-line"
                style={{
                  background:
                    "linear-gradient(to right,transparent,var(--gold))",
                }}
              />
              <Icon d={Icons.clock} size={16} color="var(--gold)" />
              <div
                className="wb-divider-line rev"
                style={{
                  background:
                    "linear-gradient(to left,transparent,var(--gold))",
                }}
              />
            </div>
          </div>
          <div
            className={`wb-timeline reveal ${eventsVisible ? "visible" : ""}`}
          >
            {events.map((ev, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" />
                <div
                  className={`timeline-card ${i % 2 === 0 ? "left" : "right"}`}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Icon d={ev.icon} size={18} color="var(--gold)" />
                    <span className="tl-time">{ev.time}</span>
                  </div>
                  <div className="tl-title">{ev.title}</div>
                  <div className="tl-desc">{ev.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section
        id="countdown"
        className="wb-section wb-section-maroon"
        ref={countdownRef}
      >
        <div className="container text-center">
          <div className={`reveal ${countdownVisible ? "visible" : ""}`}>
            <p
              className="wb-script"
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 22 }}
            >
              Counting Down
            </p>
            <h2 className="wb-section-title text-white">
              Countdown to Our Wedding
            </h2>
            <p className="wb-section-subtitle light">
              {countdown.finished
                ? "We're married! Thank you for celebrating with us."
                : "Every second brings us closer to forever"}
            </p>
          </div>
          {!countdown.finished && (
            <div
              className={`row g-3 justify-content-center mt-4 reveal ${countdownVisible ? "visible" : ""}`}
            >
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Minutes" },
                { val: countdown.seconds, label: "Seconds" },
              ].map((c, i) => (
                <div key={i} className="col-5 col-md-2">
                  <div className="countdown-box">
                    <div className="countdown-num">
                      {String(c.val ?? 0).padStart(2, "0")}
                    </div>
                    <div className="countdown-label">{c.label}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            className={`mt-5 reveal ${countdownVisible ? "visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <Icon d={Icons.heart} size={32} color="rgba(255,255,255,0.3)" />
          </div>
        </div>
      </section>

      {/* ── MEMORIES ── */}
      <section
        id="memories"
        className="wb-section wb-section-alt"
        ref={memoriesRef}
      >
        <div className="container">
          <div
            className={`text-center mb-5 reveal ${
              memoriesVisible ? "visible" : ""
            }`}
          >
            <p
              className="wb-script"
              style={{ color: "var(--maroon)", fontSize: 22 }}
            >
              Gallery
            </p>

            <h2 className="wb-section-title" style={{ color: "var(--navy)" }}>
              Our Team
            </h2>

            <p className="wb-section-subtitle">
              Moments captured, love remembered
            </p>

            <div className="wb-divider">
              <div
                className="wb-divider-line"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--maroon))",
                }}
              />

              <Icon d={Icons.camera} size={16} color="var(--maroon)" />

              <div
                className="wb-divider-line rev"
                style={{
                  background:
                    "linear-gradient(to left, transparent, var(--maroon))",
                }}
              />
            </div>
          </div>

          <div className="row g-4">
            {memories.map((m, i) => (
              <div
                key={i}
                className={`col-6 col-md-4 col-lg-3 reveal ${
                  memoriesVisible ? "visible" : ""
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <div className="ratio ratio-1x1">
                    <img
                      src={m.src}
                      alt={m.label}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>

                  <div className="card-body text-center py-3">
                    <h6
                      className="card-title mb-0 fw-semibold"
                      style={{ color: "var(--navy)" }}
                    >
                      {m.label}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RSVP + CONTRIBUTION ── */}
      <section id="rsvp" className="wb-section" ref={rsvpRef}>
        <div className="container">
          <div
            className={`text-center mb-5 reveal ${rsvpVisible ? "visible" : ""}`}
          >
            <p
              className="wb-script"
              style={{ color: "var(--maroon)", fontSize: 22 }}
            >
              Join Us
            </p>
            <h2 className="wb-section-title" style={{ color: "var(--navy)" }}>
              RSVP &amp; Contribution
            </h2>
            <p className="wb-section-subtitle">
              Let us know you're coming, and bless the couple
            </p>
          </div>
          <div className="row g-5 align-items-start">
            {/* RSVP */}
            <div
              className={`col-lg-6 reveal-left ${rsvpVisible ? "visible" : ""}`}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  padding: "40px 36px",
                  boxShadow: "0 8px 40px rgba(107,0,50,0.1)",
                  border: "1px solid rgba(107,0,50,0.1)",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    color: "var(--navy)",
                    marginBottom: 6,
                  }}
                >
                  <Icon d={Icons.users} size={20} color="var(--maroon)" />{" "}
                  &nbsp;RSVP Form
                </h4>
                <p
                  style={{
                    color: "var(--gray)",
                    fontSize: 14,
                    marginBottom: 28,
                  }}
                >
                  Please respond by August 15th, 2026
                </p>
                <RSVPForm />
              </div>
            </div>
            {/* Contribution */}
            <div
              className={`col-lg-6 reveal-right ${rsvpVisible ? "visible" : ""}`}
            >
              <div
                className="contribution-box"
                style={{
                  background: "var(--navy)",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: 24,
                  padding: "40px 36px",
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  <Icon d={Icons.gift} size={20} color="var(--gold)" />{" "}
                  &nbsp;Gift Contribution
                </h4>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 14,
                    marginBottom: 28,
                  }}
                >
                  Bless the couple with a token of love via M-PESA
                </p>

                <div
                  className="text-center py-4"
                  style={{
                    borderRadius: 16,
                    background: "rgba(201,169,110,0.08)",
                    border: "1px solid rgba(201,169,110,0.2)",
                    marginBottom: 24,
                  }}
                >
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    M-PESA Send Money To
                  </p>
                  <div className="mpesa-num">0706 195 000</div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    Reference:{" "}
                    <strong style={{ color: "var(--gold)" }}>
                      Brian &amp; Sheila
                    </strong>
                  </p>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 12,
                    padding: "20px",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Steps to send
                  </p>
                  {[
                    "Go to M-PESA → Send Money",
                    "Enter number: 0706 195 000",
                    "Enter your gift amount",
                    "Use reference: Brian & Sheila",
                    "Confirm and send 🎊",
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="d-flex align-items-center gap-3 mb-2"
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "var(--gold)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: 14,
                        }}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: 20,
                    fontStyle: "italic",
                  }}
                >
                  Your generosity means the world to us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section id="map" className="wb-section wb-section-alt">
        <div className="container">
          <div className="text-center mb-5">
            <p
              className="wb-script"
              style={{ color: "var(--maroon)", fontSize: 22 }}
            >
              Find Us
            </p>
            <h2 className="wb-section-title" style={{ color: "var(--navy)" }}>
              Venue Location
            </h2>
            <p className="wb-section-subtitle">
              Kisii, Kenya — join us for a day of love and celebration
            </p>
            <div className="wb-divider">
              <div
                className="wb-divider-line"
                style={{
                  background:
                    "linear-gradient(to right,transparent,var(--maroon))",
                }}
              />
              <Icon d={Icons.mapPin} size={16} color="var(--maroon)" />
              <div
                className="wb-divider-line rev"
                style={{
                  background:
                    "linear-gradient(to left,transparent,var(--maroon))",
                }}
              />
            </div>
          </div>
          <div className="map-wrapper" style={{ height: 420 }}>
            <iframe
              title="Wedding Venue - Kisii"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63868.44282050017!2d34.75473!3d-0.6816389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182a8c1e4aee0c27%3A0xee9bbba6b90d0b35!2sKisii%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
            />
          </div>
          <div className="row g-3 mt-4">
            {[
              { icon: Icons.mapPin, label: "Location", val: "Kisii, Kenya" },
              {
                icon: Icons.clock,
                label: "Date & Time",
                val: "30 August 2026, 10:00 AM",
              },
              {
                icon: Icons.phone,
                label: "Inquiries",
                val: "+254 706 195 000",
              },
            ].map((d, i) => (
              <div key={i} className="col-md-4">
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: "20px 24px",
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    boxShadow: "0 2px 20px rgba(107,0,50,0.07)",
                    border: "1px solid rgba(107,0,50,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg,var(--maroon),#9a004a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon d={d.icon} size={20} color="#fff" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--gray)",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      {d.label}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "var(--navy)",
                        fontSize: 15,
                      }}
                    >
                      {d.val}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="wb-footer">
        <div className="container">
          {/* Etech CTA */}
          <div className="etech-cta">
            <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
              {/* Logo placeholder */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <Icon d={Icons.star} size={24} color="#fff" />
              </div>
              <div className="text-start">
                <div className="etech-title">Etech Solutions</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
                  Your Branding & Digital Partner
                </div>
              </div>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 15,
                marginBottom: 20,
                maxWidth: 520,
                margin: "0 auto 20px",
              }}
            >
              Loved this website? We create stunning wedding websites &amp;
              handle all your branding needs. Get in touch with us today!
            </p>
            <div className="mb-4">
              {[
                "Websites",
                "Mugs",
                "T-Shirts",
                "Reflectors Branding",
                "Flyers",
                "Posters",
                "Banners",
                "Large Format Printing",
              ].map((s) => (
                <span key={s} className="service-pill">
                  {s}
                </span>
              ))}
            </div>
            <a
              href="https://wa.me/254712405172?text=Hi%20Etech%20Solutions!%20I%20saw%20the%20wedding%20website%20and%20I'd%20love%20a%20similar%20one."
              className="wa-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon d={Icons.whatsapp} size={22} color="#fff" />
              Chat on WhatsApp · 0706 195 000
            </a>
          </div>

          <hr className="wb-footer-divider" />

          <div className="row g-4 pb-5">
            <div className="col-md-4">
              <div className="wb-footer-brand mb-3">Sheila &amp; Brian</div>
              <p style={{ fontSize: 14, lineHeight: 1.8 }}>
                Two hearts, one love, and a lifetime of memories begins here.
                Thank you for being part of our beautiful journey.
              </p>
              <div className="d-flex gap-3 mt-3">
                <Icon d={Icons.heart} size={18} color="var(--gold)" />
                <Icon d={Icons.ring} size={18} color="var(--gold)" />
                <Icon d={Icons.star} size={18} color="var(--gold)" />
              </div>
            </div>
            <div className="col-md-4">
              <h6
                style={{
                  color: "#fff",
                  fontFamily: "'Playfair Display',serif",
                  marginBottom: 20,
                }}
              >
                Quick Links
              </h6>
              {navLinks.map((l) => (
                <div key={l.id} style={{ marginBottom: 10 }}>
                  <span
                    onClick={() => scrollTo(l.id)}
                    style={{
                      cursor: "pointer",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.6)",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "rgba(255,255,255,0.6)")
                    }
                  >
                    → {l.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h6
                style={{
                  color: "#fff",
                  fontFamily: "'Playfair Display',serif",
                  marginBottom: 20,
                }}
              >
                Event Details
              </h6>
              <div className="d-flex gap-3 mb-3 align-items-start">
                <Icon d={Icons.clock} size={16} color="var(--gold)" />
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                    August 30, 2026
                  </div>
                  <div style={{ fontSize: 13 }}>Starting at 10:00 AM</div>
                </div>
              </div>
              <div className="d-flex gap-3 mb-3 align-items-start">
                <Icon d={Icons.mapPin} size={16} color="var(--gold)" />
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                    Kisii, Kenya
                  </div>
                  <div style={{ fontSize: 13 }}>
                    Venue details shared on RSVP
                  </div>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <Icon d={Icons.phone} size={16} color="var(--gold)" />
                <div>
                  <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                    +254 706 195 000
                  </div>
                  <div style={{ fontSize: 13 }}>For inquiries</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "20px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ margin: 0, fontSize: 13 }}>
              © 2026 Sheila &amp; Brian Wedding. All rights reserved.
            </p>
            <p style={{ margin: 0, fontSize: 13 }}>
              Crafted with{" "}
              <Icon d={Icons.heart} size={12} color="var(--maroon)" /> by{" "}
              <a
                href="https://wa.me/254712405172"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--gold)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Etech Solutions
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
