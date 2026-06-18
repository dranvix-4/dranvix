import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { logout } from "../services/auth";
import Rail from "../components/Rail";
import Topbar from "../components/Topbar";
import BottomNav from "../components/BottomNav";
import OverviewPanel from "../components/panels/OverviewPanel";
import ExpiryPanel from "../components/panels/ExpiryPanel";
import InvoicePanel from "../components/panels/InvoicePanel";
import SettingsPanel from "../components/panels/SettingsPanel";

const PANELS = {
  overview: OverviewPanel,
  expiry:   ExpiryPanel,
  invoice:  InvoicePanel,
  settings: SettingsPanel,
};

export default function DashboardView() {
  const { dispatch } = useApp();
  const [activeView, setView] = useState("overview");
  const ActivePanel = PANELS[activeView] ?? OverviewPanel;

  async function handleLogout() {
    await logout();
    // onAuthStateChange fires SIGNED_OUT → AppContext dispatches SIGNED_OUT → user becomes null → App renders AuthView
  }

  return (
    <section className="dashboard" aria-label="MedControl dashboard">
      <Rail activeView={activeView} setView={setView} />

      <div className="dashboard-body">
        <header className="mobile-top">
          <div className="brand-mark">
            <div className="brand-icon">M+</div>
            <span>Med<span>Control</span></span>
          </div>
        </header>

        <Topbar onLogout={handleLogout} />

        <main className="main">
          <div className="view">
            <ActivePanel setView={setView} />
          </div>
        </main>
      </div>

      <BottomNav activeView={activeView} setView={setView} />
    </section>
  );
}
