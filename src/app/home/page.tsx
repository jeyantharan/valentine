"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Container } from "react-bootstrap";
import valentineImage from "@/app/media/IMG_1314.jpeg";
import stickyPhoto1 from "@/app/media/IMG_3598.jpeg";
import stickyPhoto2 from "@/app/media/IMG_7783.jpeg";
import stickyPhoto3 from "@/app/media/IMG_0727.jpeg";
import stickyPhoto4 from "@/app/media/IMG_1490.jpeg";
import stickyPhoto5 from "@/app/media/IMG_8423.jpeg";
import stickyPhoto6 from "@/app/media/c032fb77-a376-4c5b-b9c2-33ebddc8191d.jpeg";
import stickyPhoto7 from "@/app/media/c65a480d-5dcb-412d-86ea-708e66f8271a.jpeg";
import stickyPhoto8 from "@/app/media/x.jpeg";
import stickyPhoto9 from "@/app/media/y.jpeg";
import stickyPhoto10 from "@/app/media/z.jpeg";

export default function HomePage() {
  const router = useRouter();
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [yourName, setYourName] = useState("");
  const [valentineName, setValentineName] = useState("");
  const [ready, setReady] = useState(false);
  const [introProgress, setIntroProgress] = useState(0);
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const y = sessionStorage.getItem("valentineYourName");
      const v = sessionStorage.getItem("valentineName");
      if (!y || !v) {
        router.replace("/");
        return;
      }
      setYourName(y);
      setValentineName(v);
      setReady(true);
    }
  }, [router]);

  const handleOpen = () => {
    setEnvelopeOpening(true);
    setTimeout(() => {
      setLetterOpen(true);
      setIntroVisible(true);
    }, 600);
  };

  // After envelope opens, show intro (Happy Valentine's Day + image). After 10s, show double page.
  useEffect(() => {
    if (!introVisible) return;
    setIntroProgress(0);
    progressRef.current = setInterval(() => {
      setIntroProgress((p) => {
        if (p >= 100) {
          if (progressRef.current) clearInterval(progressRef.current);
          return 100;
        }
        return p + 1;
      });
    }, 100);
    introTimerRef.current = setTimeout(() => {
      if (progressRef.current) clearInterval(progressRef.current);
      setIntroVisible(false);
      setMessageVisible(true);
    }, 10000);
    return () => {
      if (introTimerRef.current) clearTimeout(introTimerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [introVisible]);

  const openLetterNow = () => {
    if (introTimerRef.current) clearTimeout(introTimerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setIntroVisible(false);
    setMessageVisible(true);
  };

  if (!ready) {
    return (
      <div className="valentine-page">
        <div className="loading-state">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`valentine-page ${messageVisible ? "message-view-active" : ""}`}>
      <Container className="text-center py-4">
        {!letterOpen ? (
          <>
            <h2 className="page-heading mb-2">
              💌 For you, {yourName}
            </h2>
            <p className="page-subtitle">Click the envelope or the button below to open your letter</p>
            <div className="envelope-card">
              <div className="envelope-wrapper mx-auto" onClick={handleOpen}>
                <div className={`envelope-trending ${envelopeOpening ? "open" : ""}`}>
                  <div className="envelope-body">
                    <div className="envelope-flap" />
                    <div className="envelope-seal">
                      <span className="seal-heart">❤</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-open-envelope"
                onClick={handleOpen}
              >
                Open envelope
              </button>
            </div>
          </>
        ) : introVisible ? (
          <div className="intro-screen">
            <h1 className="intro-title">Happy Valentine&apos;s Day</h1>
            <div className="intro-image-wrap">
              <Image
                src={valentineImage}
                alt="Us"
                width={340}
                height={340}
                className="intro-image"
                priority
              />
            </div>
            <div className="intro-progress-wrap">
              <div className="intro-progress-bar" style={{ width: `${introProgress}%` }} />
            </div>
            <p className="intro-hint">Opening your letter in a moment...</p>
            <button type="button" className="btn-open-now" onClick={openLetterNow}>
              Open letter now
            </button>
          </div>
        ) : messageVisible ? (
          <div className="letter-wrap">
            <div className="letter-stickies-top">
            <div className="sticky-note sticky-note-left">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto1} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Forever ours 💕</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-right">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto2} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Love this moment 🌹</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-top">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto3} alt="Us" fill className="sticky-note-img sticky-note-img-crop-bottom" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Together always 💖</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-bottom">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto4} alt="Us" fill className="sticky-note-img sticky-note-img-crop-bottom" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Our special day 💕</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-big sticky-note-text sticky-note-text-1">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">First meet 2026</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-big sticky-note-text sticky-note-text-2">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">10th Valentine&apos;s Day 💕</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-big sticky-note-text sticky-note-text-3">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">You are my today and all of my tomorrows.</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-4">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Love is looking in the same direction together.</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-big sticky-note-text sticky-note-text-left-1">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Forever & always 💕</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-left-2">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">My favourite person</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-top-left">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto5} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Best moments 🌸</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-top-right">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto6} alt="Us" fill className="sticky-note-img sticky-note-img-crop-bottom" sizes="130px" />
                </div>
                <p className="sticky-note-msg">You & me 💗</p>
              </div>
            </div>
            </div>
            <div className="letter-stickies-bottom">
            <div className="sticky-note sticky-note-bottom-left">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto7} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Holiday vibes 🎄</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-bottom-right">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto8} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Always together 💖</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-mid-left">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto9} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Beach days 🌴</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-mid-right">
              <div className="sticky-note-inner sticky-note-yellow">
                <div className="sticky-note-photo">
                  <Image src={stickyPhoto10} alt="Us" fill className="sticky-note-img" sizes="130px" />
                </div>
                <p className="sticky-note-msg">Us 💕</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-big sticky-note-text sticky-note-text-5">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">In you I found the love of my life & my truest friend.</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-6">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Every moment with you is a gift. 💖</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-big sticky-note-text sticky-note-text-right-1">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">With you, I&apos;m home 💖</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-right-2">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Always us</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-left-3">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">You make my heart smile 💗</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-left-4">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Together is my favourite place</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-right-3">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Best chapter with you 📖💕</p>
              </div>
            </div>
            <div className="sticky-note sticky-note-text sticky-note-text-right-4">
              <div className="sticky-note-inner sticky-note-yellow sticky-note-text-inner">
                <p className="sticky-note-text-line">Love you more each day</p>
              </div>
            </div>
            </div>
            <div className="letter">
              <h2>💕 Happy Valentine&apos;s Day! 💕</h2>
              <p>Dear {yourName},</p>
              <p>
                You make every day brighter. Thank you for being you—for your smile, your kindness,
                and the way you make ordinary moments feel special.
              </p>
              <p>
                On this Valentine&apos;s Day, I just want you to know how much you mean to me.
                Here&apos;s to more laughter, more adventures, and more love together.
              </p>
              <p>With all my love,</p>
              <p className="letter-sign">— {valentineName} 💖</p>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
