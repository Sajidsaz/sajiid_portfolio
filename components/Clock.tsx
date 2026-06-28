"use client";

import { useEffect, useState } from "react";

/** Live Colombo clock (UTC+5:30). Renders "—" on the server to avoid hydration mismatch. */
export default function Clock() {
  const [time, setTime] = useState("—");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const colombo = new Date(
        now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000
      );
      const hh = String(colombo.getHours()).padStart(2, "0");
      const mm = String(colombo.getMinutes()).padStart(2, "0");
      const ss = String(colombo.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} +0530`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="clock" aria-hidden="true">
      {time}
    </span>
  );
}
