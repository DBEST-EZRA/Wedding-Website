import React, { useMemo, useState, useEffect } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaWhatsapp,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/**
 * Admin RSVP Dashboard
 * - Bootstrap-based, responsive
 * - Palette: maroon, navy blue, white, gray (+ shades) via CSS variables
 * - Statuses: "Joyfully Accept" / "Regretfully Decline"
 * - WhatsApp action button: normalizes Kenyan numbers (0700..., 254700..., +254700...)
 *   and opens wa.me with a prefilled message
 * - Paginated table for large guest lists
 *
 * Requires: npm install react-icons
 */

// ---------- Statuses ----------
const STATUS = {
  ACCEPT: "Joyfully Accept",
  DECLINE: "Regretfully Decline",
};

// ---------- Dummy data (replace with real API data) ----------
const DUMMY_GUESTS = [
  {
    id: 1,
    fullName: "Wanjiru Kamau",
    phone: "0712345678",
    status: STATUS.ACCEPT,
    guests: 2,
  },
  {
    id: 2,
    fullName: "Otieno Brian",
    phone: "254723456789",
    status: STATUS.ACCEPT,
    guests: 1,
  },
  {
    id: 3,
    fullName: "Amina Hassan",
    phone: "+254734567890",
    status: STATUS.ACCEPT,
    guests: 4,
  },
  {
    id: 4,
    fullName: "David Mwangi",
    phone: "0745678901",
    status: STATUS.DECLINE,
    guests: 0,
  },
  {
    id: 5,
    fullName: "Faith Chebet",
    phone: "254756789012",
    status: STATUS.ACCEPT,
    guests: 3,
  },
  {
    id: 6,
    fullName: "Peter Kiprono",
    phone: "+254767890123",
    status: STATUS.DECLINE,
    guests: 0,
  },
  {
    id: 7,
    fullName: "Grace Nyambura",
    phone: "0778901234",
    status: STATUS.ACCEPT,
    guests: 2,
  },
  {
    id: 8,
    fullName: "Samuel Ouma",
    phone: "254789012345",
    status: STATUS.ACCEPT,
    guests: 5,
  },
  {
    id: 9,
    fullName: "Mercy Atieno",
    phone: "0701122334",
    status: STATUS.ACCEPT,
    guests: 2,
  },
  {
    id: 10,
    fullName: "John Kariuki",
    phone: "254712233445",
    status: STATUS.DECLINE,
    guests: 0,
  },
  {
    id: 11,
    fullName: "Lilian Wambui",
    phone: "+254723344556",
    status: STATUS.ACCEPT,
    guests: 1,
  },
  {
    id: 12,
    fullName: "Brian Cheruiyot",
    phone: "0734455667",
    status: STATUS.ACCEPT,
    guests: 3,
  },
  {
    id: 13,
    fullName: "Esther Njoki",
    phone: "254745566778",
    status: STATUS.ACCEPT,
    guests: 2,
  },
  {
    id: 14,
    fullName: "Kevin Omondi",
    phone: "+254756677889",
    status: STATUS.DECLINE,
    guests: 0,
  },
  {
    id: 15,
    fullName: "Diana Mutua",
    phone: "0767788990",
    status: STATUS.ACCEPT,
    guests: 4,
  },
  {
    id: 16,
    fullName: "Tom Wekesa",
    phone: "254778899001",
    status: STATUS.ACCEPT,
    guests: 1,
  },
  {
    id: 17,
    fullName: "Joy Akinyi",
    phone: "+254789900112",
    status: STATUS.DECLINE,
    guests: 0,
  },
  {
    id: 18,
    fullName: "Nicholas Mbugua",
    phone: "0790011223",
    status: STATUS.ACCEPT,
    guests: 3,
  },
];

// ---------- Phone helpers ----------
// Normalizes Kenyan numbers typed as 0700000000 / 254700000000 / +254700000000
// into a clean format for wa.me: 254700000000
function normalizeKenyanPhone(raw) {
  if (!raw) return null;
  let digits = raw.replace(/[^\d]/g, ""); // strip spaces, +, dashes, etc.

  if (digits.startsWith("254")) {
    return digits.length === 12 ? digits : null;
  }
  if (digits.startsWith("0")) {
    // 0700000000 -> 254700000000
    return digits.length === 10 ? "254" + digits.slice(1) : null;
  }
  if (digits.startsWith("7") || digits.startsWith("1")) {
    // someone typed 700000000 without leading 0
    return digits.length === 9 ? "254" + digits : null;
  }
  return null;
}

function formatDisplayPhone(raw) {
  const normalized = normalizeKenyanPhone(raw);
  if (!normalized) return raw;
  return "+" + normalized;
}

function buildWhatsAppLink(rawPhone, fullName, status) {
  const normalized = normalizeKenyanPhone(rawPhone);
  if (!normalized) return null;
  const firstName = fullName.split(" ")[0];
  const message =
    status === STATUS.DECLINE
      ? `Hi ${firstName}, thank you for letting us know. We're sorry you can't make it, but we appreciate your response and hope to see you next time! 💛`
      : `Hi ${firstName}, thank you for your RSVP! We're excited to have you join us. If you need any details about the event, just reply here. 🎉`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

// ---------- Status badge ----------
function StatusBadge({ status }) {
  const isAccept = status === STATUS.ACCEPT;
  return (
    <span
      className={`status-badge ${isAccept ? "status-accept" : "status-decline"}`}
    >
      {isAccept ? (
        <FaCheckCircle className="me-1" />
      ) : (
        <FaTimesCircle className="me-1" />
      )}
      {status}
    </span>
  );
}

const PAGE_SIZE = 8;

const Admin = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const totalGuests = useMemo(
    () =>
      DUMMY_GUESTS.reduce(
        (sum, g) => sum + (g.status === STATUS.ACCEPT ? g.guests : 0),
        0,
      ),
    [],
  );

  const totalAccepted = useMemo(
    () => DUMMY_GUESTS.filter((g) => g.status === STATUS.ACCEPT).length,
    [],
  );

  const totalDeclined = useMemo(
    () => DUMMY_GUESTS.filter((g) => g.status === STATUS.DECLINE).length,
    [],
  );

  const filtered = useMemo(() => {
    return DUMMY_GUESTS.filter((g) => {
      const matchesSearch =
        g.fullName.toLowerCase().includes(search.toLowerCase()) ||
        g.phone.includes(search.replace(/[^\d]/g, ""));
      const matchesStatus = statusFilter === "All" || g.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const handleWhatsApp = (phone, fullName, status) => {
    const link = buildWhatsAppLink(phone, fullName, status);
    if (!link) {
      alert(`Couldn't recognize "${phone}" as a valid Kenyan number.`);
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="admin-page">
      <style>{`
        :root {
          --maroon: #7a1f2b;
          --maroon-dark: #5c1620;
          --maroon-light: #f6e6e9;
          --navy: #1b2a4a;
          --navy-dark: #101b30;
          --navy-light: #e7eaf2;
          --gray-50: #f8f9fa;
          --gray-100: #f1f2f4;
          --gray-300: #d7dade;
          --gray-500: #8a8f98;
          --gray-700: #4d5258;
          --white: #ffffff;
        }

        .admin-page {
          background: var(--gray-50);
          min-height: 100vh;
          font-family: 'Segoe UI', Roboto, system-ui, sans-serif;
          color: var(--navy-dark);
        }

        .admin-topbar {
          background: var(--navy-dark);
          color: var(--white);
          padding: 1rem 1.5rem;
        }

        .admin-topbar h1 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.02em;
        }

        .admin-topbar .subtitle {
          color: var(--gray-300);
          font-size: 0.85rem;
        }

        .stat-card {
          border: none;
          border-radius: 0.75rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          overflow: hidden;
          height: 100%;
        }

        .stat-card .stat-accent {
          height: 4px;
        }

        .accent-maroon { background: var(--maroon); }
        .accent-navy { background: var(--navy); }
        .accent-gray { background: var(--gray-500); }

        .stat-card .stat-body {
          padding: 1.1rem 1.25rem;
        }

        .stat-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--gray-700);
          margin-bottom: 0.35rem;
        }

        .stat-value {
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--navy-dark);
        }

        .stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: var(--white);
          flex-shrink: 0;
        }

        .toolbar-card {
          border: none;
          border-radius: 0.75rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .search-wrap {
          position: relative;
        }
        .search-wrap .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-500);
        }
        .search-input {
          border-color: var(--gray-300);
          padding-left: 2.2rem;
        }
        .search-input:focus {
          border-color: var(--maroon);
          box-shadow: 0 0 0 0.2rem rgba(122,31,43,0.15);
        }

        .status-select:focus {
          border-color: var(--navy);
          box-shadow: 0 0 0 0.2rem rgba(27,42,74,0.15);
        }

        .table-card {
          border: none;
          border-radius: 0.75rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .table thead th {
          background: var(--navy);
          color: var(--white);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          border: none;
          white-space: nowrap;
        }

        .table tbody tr:hover {
          background: var(--maroon-light);
        }

        .table td {
          vertical-align: middle;
          font-size: 0.92rem;
        }

        .guest-name {
          font-weight: 600;
          color: var(--navy-dark);
        }

        .guest-phone {
          color: var(--gray-700);
          font-size: 0.85rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.28rem 0.65rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-accept {
          background: #e3f3e6;
          color: #1f7a3a;
        }
        .status-decline {
          background: var(--gray-100);
          color: var(--gray-700);
        }

        .whatsapp-btn {
          background: #25D366;
          color: var(--white);
          border: none;
          border-radius: 0.5rem;
          padding: 0.4rem 0.7rem;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .whatsapp-btn:hover {
          background: #1ebe57;
          color: var(--white);
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(37,211,102,0.35);
        }
        .whatsapp-btn:disabled {
          background: var(--gray-300);
          color: var(--gray-700);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--gray-700);
        }
        .empty-state .empty-icon {
          font-size: 1.6rem;
          color: var(--gray-500);
          margin-bottom: 0.5rem;
        }

        .pagination-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.1rem;
          border-top: 1px solid var(--gray-100);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pagination-info {
          font-size: 0.85rem;
          color: var(--gray-700);
        }

        .page-btn {
          border: 1px solid var(--gray-300);
          background: var(--white);
          color: var(--navy-dark);
          border-radius: 0.4rem;
          padding: 0.3rem 0.6rem;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .page-btn:hover:not(:disabled) {
          background: var(--navy-light);
        }
        .page-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .page-btn.active {
          background: var(--maroon);
          color: var(--white);
          border-color: var(--maroon);
        }

        @media (max-width: 576px) {
          .stat-value { font-size: 1.5rem; }
        }
      `}</style>

      {/* Top bar */}
      <div className="admin-topbar">
        <h1>Event RSVP Admin</h1>
        <div className="subtitle">
          Manage guest responses &amp; reach out via WhatsApp
        </div>
      </div>

      <div className="container-fluid p-3 p-md-4">
        {/* Stats row */}
        <div className="row g-3 mb-3">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-accent accent-maroon"></div>
              <div className="stat-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="stat-label">Total Guests</div>
                  <div className="stat-value">{totalGuests}</div>
                </div>
                <div
                  className="stat-icon"
                  style={{ background: "var(--maroon)" }}
                >
                  <FaUsers />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-accent accent-navy"></div>
              <div className="stat-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="stat-label">Joyfully Accepted</div>
                  <div className="stat-value">{totalAccepted}</div>
                </div>
                <div
                  className="stat-icon"
                  style={{ background: "var(--navy)" }}
                >
                  <FaCheckCircle />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-accent accent-gray"></div>
              <div className="stat-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="stat-label">Regretfully Declined</div>
                  <div className="stat-value">{totalDeclined}</div>
                </div>
                <div
                  className="stat-icon"
                  style={{ background: "var(--gray-500)" }}
                >
                  <FaTimesCircle />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-accent accent-maroon"></div>
              <div className="stat-body d-flex justify-content-between align-items-center">
                <div>
                  <div className="stat-label">Total RSVPs</div>
                  <div className="stat-value">{DUMMY_GUESTS.length}</div>
                </div>
                <div
                  className="stat-icon"
                  style={{ background: "var(--maroon-dark)" }}
                >
                  <FaClipboardList />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar-card p-3 mb-3">
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-6">
              <div className="search-wrap">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search by name or phone number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-3">
              <select
                className="form-select status-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All statuses</option>
                <option value={STATUS.ACCEPT}>Joyfully Accept</option>
                <option value={STATUS.DECLINE}>Regretfully Decline</option>
              </select>
            </div>
            <div className="col-12 col-md-3 text-md-end text-muted small">
              Showing {filtered.length} of {DUMMY_GUESTS.length} guests
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Phone Number</th>
                  <th>Attendance Status</th>
                  <th className="text-center">Guests</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((g) => {
                  const validNumber = !!normalizeKenyanPhone(g.phone);
                  return (
                    <tr key={g.id}>
                      <td className="guest-name">{g.fullName}</td>
                      <td className="guest-phone">
                        {formatDisplayPhone(g.phone)}
                      </td>
                      <td>
                        <StatusBadge status={g.status} />
                      </td>
                      <td className="text-center">{g.guests}</td>
                      <td className="text-center">
                        <button
                          className="whatsapp-btn"
                          disabled={!validNumber}
                          onClick={() =>
                            handleWhatsApp(g.phone, g.fullName, g.status)
                          }
                          title={
                            validNumber
                              ? "Message on WhatsApp"
                              : "Invalid phone number"
                          }
                        >
                          <FaWhatsapp /> WhatsApp
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <FaSearch />
              </div>
              <div>No guests match your search.</div>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="pagination-bar">
              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
              <div className="d-flex align-items-center gap-1">
                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft /> Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      Math.abs(p - currentPage) <= 1 ||
                      p === 1 ||
                      p === totalPages,
                  )
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1)
                      acc.push("ellipsis-" + p);
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p) =>
                    typeof p === "string" ? (
                      <span key={p} className="px-1 text-muted">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        className={`page-btn ${p === currentPage ? "active" : ""}`}
                        onClick={() => goToPage(p)}
                      >
                        {p}
                      </button>
                    ),
                  )}

                <button
                  className="page-btn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
