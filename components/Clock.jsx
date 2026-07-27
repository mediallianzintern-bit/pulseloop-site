"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":")
      );
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return <span>{time}</span>;
}
