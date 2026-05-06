import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Brand / Quote */}
          <div className="col-md-4 footer-section">
            <h3 className="footer-title">Brian & Sheila</h3>
            <p className="footer-quote">
              “Love is not about how many days, months, or years you spend
              together, but how much you love each other every day.”
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#rsvp">RSVP</a>
              </li>

              <li>
                <a
                  href="https://wa.me/254712405172"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join WhatsApp Group
                </a>
              </li>

              <li>
                <a href="#programme">Programme</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="col-md-4 footer-section">
            <h4>Need a Website?</h4>
            <p>Want a similar wedding or business website?</p>

            <a
              href="https://wa.me/254712405172?text=Hi%20Betasoftwares,%20I%20need%20a%20website"
              target="_blank"
              rel="noreferrer"
              className="footer-btn"
            >
              Click here to contact Betasoftwares
            </a>

            <p className="small-note mt-3">
              Fast, modern, and beautifully designed websites.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Betasoftwares. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
