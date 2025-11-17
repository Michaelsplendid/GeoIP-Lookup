import React, { useState, useEffect } from "react";
import { lookupIP } from "./services/ipstack";
import { setCache, getCache, setCookie, getCookie } from "./proxy";
import GeoCard from "./components/GeoCard";
import MapView from "./components/MapView";
import { IpstackResponse } from "./types/ipstack";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaGlobe } from "react-icons/fa";
import "./styles.css";

export default function App() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState<IpstackResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);

    if (savedTheme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Check for cached IP data
    const cached =
      getCache<IpstackResponse>("proxy:check") ||
      getCache<IpstackResponse>("direct:check") ||
      getCookie<IpstackResponse>("lastIpData");

    if (cached) {
      setData(cached);
    } else {
      handleLookup();
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  async function handleLookup() {
    setError(null);
    setLoading(true);
    setData(null);

    try {
      const resp = await lookupIP(ip.trim() || "check");

      if (!resp.latitude || !resp.longitude) {
        setError("Could not detect your location. Try again.");
        return;
      }

      // Update state with new geolocation data
      setData(resp);

      // Cache the IP data for later use
      setCache(`proxy:${resp.ip}`, resp, 3600);
      setCookie("lastIpData", resp, 7);
    } catch (err: any) {
      setError(err?.message ?? "Failed to lookup IP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <FaGlobe className="globe-icon" />
          <span>GeoIP Lookup</span>
        </div>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </nav>

      <h1>GeoIP Lookup</h1>

      <p className="small">
        Enter an IP address or leave it blank to auto-detect your current location.
      </p>

      {/* INPUT + BUTTON */}
      <div className="controls">
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="e.g. 8.8.8.8 or leave empty"
        />
        <button onClick={handleLookup} disabled={loading}>
          {loading ? "Looking..." : "Lookup"}
        </button>
      </div>

      {/* ERROR */}
      {error && <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>}

      {/* GEO CARD */}
      <GeoCard data={data} />

      {/* MAP VIEW */}
      <MapView
        lat={data?.latitude ?? null}
        lng={data?.longitude ?? null}
        label={data?.ip}
      />

      {/* DEBUG RAW JSON RESPONSE */}
      <details style={{ marginTop: 12 }}>
        <summary>Response JSON (debug)</summary>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {data ? JSON.stringify(data, null, 2) : "—"}
        </pre>
      </details>

      <footer style={{ marginTop: 18 }} className="small">
        Powered by IPstack — providing accurate global IP geolocation data.
        <br />
        Built by PhileTech
      </footer>
    </div>
  );
}