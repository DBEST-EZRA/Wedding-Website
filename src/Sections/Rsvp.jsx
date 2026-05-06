import "./rsvp.css";

const Rsvp = () => {
  return (
    <section className="rsvp-section">
      <div className="container">
        <h2 className="rsvp-title">RSVP</h2>
        <p className="rsvp-subtitle">Kindly confirm your attendance</p>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="rsvp-card">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control rsvp-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control rsvp-input"
                    placeholder="Enter your phone"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rsvp-input"
                    placeholder="Enter your email"
                  />
                </div>

                <button type="submit" className="btn rsvp-btn w-100">
                  Send RSVP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rsvp;
