"use client";

import { useEffect, useRef } from "react";

const BGM_SRC = "/media/dinuinfinity-nenjukkul-peidhidum-by-dinesh-babu-407735.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;

    const startBgm = () => {
      if (startedRef.current || !audioRef.current) return;
      startedRef.current = true;
      audioRef.current.play().catch(() => {});
      document.removeEventListener("click", startBgm);
      document.removeEventListener("touchstart", startBgm);
      document.removeEventListener("keydown", startBgm);
    };

    document.addEventListener("click", startBgm, { once: true });
    document.addEventListener("touchstart", startBgm, { once: true });
    document.addEventListener("keydown", startBgm, { once: true });

    return () => {
      document.removeEventListener("click", startBgm);
      document.removeEventListener("touchstart", startBgm);
      document.removeEventListener("keydown", startBgm);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
}
