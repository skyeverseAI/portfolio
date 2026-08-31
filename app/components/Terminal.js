"use client";

import { useEffect, useRef, useState } from "react";

const CMD1 = "cd akash/";
const CMD2 = "cat aboutme.txt";
const ROUTES = ["about", "stack", "work", "writings", "contact"];

/* Splits "…{automations} (…) and {applied ML} (…)" into highlighted spans. */
function renderRegisters(text) {
  return text.split(/(\{[^}]+\})/).map((part, i) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <span className="tkw" key={i}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    )
  );
}

export default function Terminal({ title, intro, registers }) {
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [stage, setStage] = useState(0); // 0 typing cmd1, 1 typing cmd2, 2 done
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState("");
  const timers = useRef([]);

  function finish() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyped1(CMD1);
    setTyped2(CMD2);
    setStage(2);
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred so the state update lands in a callback, not the effect body.
      const skipTimer = setTimeout(finish, 0);
      return () => clearTimeout(skipTimer);
    }

    let i = 0;
    function typeFirst() {
      setTyped1(CMD1.slice(0, i));
      i += 1;
      if (i <= CMD1.length) {
        timers.current.push(setTimeout(typeFirst, 58));
      } else {
        setStage(1);
        let j = 0;
        function typeSecond() {
          setTyped2(CMD2.slice(0, j));
          j += 1;
          if (j <= CMD2.length) timers.current.push(setTimeout(typeSecond, 48));
          else timers.current.push(setTimeout(() => setStage(2), 260));
        }
        timers.current.push(setTimeout(typeSecond, 260));
      }
    }
    typeFirst();

    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    const raw = value.trim();
    const cmd = raw.toLowerCase();
    setValue("");
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    if (cmd === "ls") {
      setHistory((h) => [
        ...h,
        { cls: "tdim", text: "about/    stack/    work/    writings/    contact/" },
      ]);
      return;
    }
    if (cmd === "whoami") {
      setHistory((h) => [
        ...h,
        {
          cls: "tout",
          text: "A person who builds production-grade AI systems and automations to eliminate repetitive work.",
        },
      ]);
      return;
    }

    const key = cmd.replace(/^\//, "").replace(/\/$/, "");
    if (ROUTES.includes(key)) {
      document.getElementById(key)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setHistory((h) => [
      ...h,
      {
        cls: "tdim",
        text: `command not found: ${raw} — try ls, whoami, clear, or /about`,
      },
    ]);
  }

  return (
    <div className="term">
      <div className="term-head">
        <span className="term-head-left">
          <span className="term-head-dot" /> {title}
        </span>
        {stage < 2 ? (
          <button type="button" className="skip" onClick={finish}>
            skip
          </button>
        ) : (
          <span className="skip">READY</span>
        )}
      </div>

      <div className="term-body">
        <p className="tline">
          <span className="tuser">akash@build</span>
          <span className="tpath">:~$</span> {typed1}
          {stage === 0 && <span className="caret blink" />}
        </p>

        {stage >= 1 && (
          <p className="tline">
            <span className="tuser">akash@build</span>
            <span className="tpath">:~/akash/$</span> {typed2}
            {stage === 1 && <span className="caret blink" />}
          </p>
        )}

        {stage === 2 && (
          <>
            <div className="tgap" />
            <p className="tline tout">{intro}</p>
            <div className="tgap" />
            <p className="tline tout">{renderRegisters(registers)}</p>
            <div className="tgap" />
            <p className="tline">
              <span className="tuser">akash@build</span>
              <span className="tpath">:~/akash/$</span> ls
            </p>
            <p className="tline tdim">
              about/&nbsp;&nbsp;&nbsp;&nbsp;stack/&nbsp;&nbsp;&nbsp;&nbsp;work/&nbsp;&nbsp;&nbsp;&nbsp;writings/&nbsp;&nbsp;&nbsp;&nbsp;contact/
            </p>
            <div className="tgap" />

            {history.map((line, i) => (
              <div key={i}>
                <p className={`tline ${line.cls}`}>{line.text}</p>
                <div className="tgap" />
              </div>
            ))}

            <form className="term-input-row" onSubmit={onSubmit}>
              <span className="tuser">akash@build</span>
              <span className="tpath">:~/akash/$</span>
              <input
                className="term-input"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="type a command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
