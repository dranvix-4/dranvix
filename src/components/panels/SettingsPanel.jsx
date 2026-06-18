// src/components/panels/SettingsPanel.jsx
import React from "react";
import { useApp } from "../../context/AppContext";
import { saveSettings, DEFAULT_SETTINGS } from "../../services/settings";

const COLOR_CONTROLS = [
  { id: "brandColor",  key: "brand",  label: "Brand",        fallback: "#22c55e" },
  { id: "dangerColor", key: "danger", label: "Red expiry",   fallback: "#ef4444" },
  { id: "warnColor",   key: "warn",   label: "Amber expiry", fallback: "#f59e0b" },
  { id: "safeColor",   key: "safe",   label: "Green expiry", fallback: "#22c55e" },
];

export default function SettingsPanel() {
  const { settings = DEFAULT_SETTINGS, dispatch } = useApp();

  async function handleColorChange(key, value) {
    dispatch({ type: "SETTINGS_UPDATED", payload: { ...settings, [key]: value } });
    try { await saveSettings({ [key]: value }); } catch (e) { console.error(e); }
  }

  async function handleDensityChange(value) {
    dispatch({ type: "SETTINGS_UPDATED", payload: { ...settings, density: value } });
    try { await saveSettings({ density: value }); } catch (e) { console.error(e); }
  }

  async function handleReset() {
    try {
      await saveSettings(DEFAULT_SETTINGS);
      dispatch({ type: "SETTINGS_UPDATED", payload: DEFAULT_SETTINGS });
    } catch (e) { console.error(e); }
  }

  return (
    <>
      <div className="hero-strip">
        <div className="hero-text">
          <h2>Customize without rebuilding</h2>
          <p>Theme tokens and density are centralized — changes persist to your account instantly.</p>
        </div>
        <div className="hero-actions">
          <button className="ghost-btn" type="button" onClick={handleReset}>Reset theme</button>
        </div>
      </div>

      <section className="surface">
        <div className="surface-head">
          <h3>Theme controls</h3>
          <span>saved to your account</span>
        </div>
        <div className="customizer">
          {COLOR_CONTROLS.map(({ id, key, label, fallback }) => (
            <div key={id} className="swatch-control">
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                type="color"
                value={settings[key] ?? fallback}
                onChange={e => handleColorChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="density">
          <label htmlFor="densityRange">Control density — {settings.density ?? 44}px</label>
          <input
            id="densityRange"
            type="range"
            min="38" max="54"
            value={settings.density ?? 44}
            onChange={e => handleDensityChange(Number(e.target.value))}
          />
        </div>
      </section>
    </>
  );
}
