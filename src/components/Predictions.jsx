import React from "react";
import { useApp } from "../context/AppContext";

export default function Predictions() {
  const { predictions = [] } = useApp();

  return (
    <section className="surface">
      <div className="surface-head">
        <h3>Demand AI</h3>
        <span>next 14 days</span>
      </div>
      <div className="prediction-list">
        {predictions.length === 0 ? (
          <p style={{ padding: "16px", color: "var(--muted)", fontSize: "13px" }}>
            No predictions yet. Add medicines to generate forecasts.
          </p>
        ) : (
          predictions.map((item) => (
            <div key={item.id} className="prediction">
              <div className="mini-symbol">AI</div>
              <div>
                <strong>{item.name}</strong>
                <span>{item.reason}</span>
              </div>
              <div className="delta">{item.delta}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
