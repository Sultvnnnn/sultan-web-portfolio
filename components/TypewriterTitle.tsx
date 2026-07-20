"use client";

import { useState, useEffect } from "react";

export default function TypewriterTitle() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);

  const phrases = [
    'Sultan says "Hi, welcome to my little corner of the internet."',
    "He builds things with code, not magic tricks. Vibe code counts too.",
    "I'm a data enthusiast.",
    "Also, a Software Engineer.",
  ];

  useEffect(() => {
    const i = loopNum % phrases.length;
    const fullText = phrases[i];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(30);
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(50);
      }, typingSpeed);
    }

    if (!isDeleting && displayText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
    <h1 className="font-lora text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight">
      {displayText}
      <span className="animate-pulse text-blue-600 dark:text-blue-400">|</span>
    </h1>
  );
}
