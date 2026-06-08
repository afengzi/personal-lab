"use client";

import { useEffect, useRef, useState } from "react";
import type { LogLine } from "@/components/hud/ConsoleLog";

const pad = (n: number) => String(n).padStart(2, "0");

/* Streams new log lines onto a seed list every 2.2s (client-only overlay). */
export function useConsoleStream(seed: LogLine[], stream: { tag: string; msg: string }[]) {
  const [lines, setLines] = useState<LogLine[]>(seed);
  const i = useRef(0);
  useEffect(() => {
    const id = setInterval(() => {
      const s = stream[i.current % stream.length];
      i.current++;
      const t = new Date();
      setLines((ls) => [...ls.slice(-7), { time: `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`, tag: s.tag, msg: s.msg }]);
    }, 2200);
    return () => clearInterval(id);
  }, [stream]);
  return lines;
}

/* Ticking clock label for the console header. */
export function useClock() {
  const [now, setNow] = useState(() => new Date("2025-05-23T22:48:36"));
  useEffect(() => {
    const id = setInterval(() => setNow((d) => new Date(d.getTime() + 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  return `2025-05-23 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
