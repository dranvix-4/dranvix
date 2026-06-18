import React from "react";
import { useApp } from "../context/AppContext";

function formatTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function typeToMark(type) {
  const map = {
    medicine_added:   "A",
    medicine_updated: "U",
    medicine_deleted: "D",
    invoice_imported: "P",
    stock_adjusted:   "S",
    settings_updated: "C",
  };
  return map[type] ?? "•";
}

export default function ActivityFeed() {
  const { activity = [] } = useApp();

  return (
    <section className="surface">
      <div className="surface-head">
        <h3>Activity</h3>
        <span>live ledger</span>
      </div>
      <div className="activity-list">
        {activity.length === 0 ? (
          <p style={{ padding: "16px", color: "var(--muted)", fontSize: "13px" }}>
            No activity yet.
          </p>
        ) : (
          activity.map((item) => (
            <div key={item.id} className="activity">
              <div className="mini-symbol">{typeToMark(item.type)}</div>
              <div>
                <strong>{item.type?.replace(/_/g, " ")}</strong>
                <span>{item.description}</span>
              </div>
              <div className="nav-kbd">{formatTime(item.created_at)}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
