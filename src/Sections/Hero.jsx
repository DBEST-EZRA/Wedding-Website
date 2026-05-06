import "./hero.css";

function Hero() {
  return (
    <section className="hero d-flex align-items-center justify-content-center text-center">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <div className="container position-relative z-2">
        <p className="subtitle">Together with their families</p>

        <h1 className="couple-names">
          Sheila Gisemba <span>&</span> Brian Mosioma
        </h1>

        <p className="romantic-line">
          "Two hearts, one love, and a lifetime of memories begins here."
        </p>

        <p className="date">30th August</p>

        <button className="btn btn-wine mt-4">RSVP</button>
      </div>
    </section>
  );
}

export default Hero;
