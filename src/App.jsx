import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

export default function App() {
  const containerRef = useRef(null);

  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [teaseText, setTeaseText] = useState("Go on… pick one 😌");

  const phrases = useMemo(
    () => [
      "Are you sure? 🥺",
      "That feels illegal 😭",
      "Nice try 😆",
      "No button malfunction detected 🛠️",
      "Plot twist: YES wins 💘",
      "This button fears commitment 😌",
    ],
    []
  );

  const fireConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.35 },
    });
  };

  const handleYes = () => {
    setAccepted(true);
    fireConfetti();
  };

  const dodgeNo = () => {
    const el = containerRef.current;
    if (!el) return;

    const { width, height } = el.getBoundingClientRect();

    const x = Math.random() * (width - 140) - width / 2;
    const y = Math.random() * (height - 140) - height / 2;

    setNoPos({ x, y });
    setNoScale((s) => Math.max(0.6, s - 0.05));
    setYesScale((s) => Math.min(1.35, s + 0.05));
    setTeaseText(phrases[Math.floor(Math.random() * phrases.length)]);
  };

  useEffect(() => {
    setNoPos({ x: -10, y: 8 });
  }, []);

  return (
    <div className="page">
      <div className="glow pink" />
      <div className="glow purple" />

      <div ref={containerRef} className="card">
        {!accepted ? (
          <>
            <div className="header-row">
              <span className="badge">💌 important</span>
              <span className="built-msg">I built this app specially just for you 🫶🏽</span>
            </div>

            <h1 className="title">
              LaTrenda Thompson, Will you be my <span>Valentine</span>? 💘
            </h1>

            <p className="subtitle">
              Choose wisely. One option is clearly broken.
            </p>

            <div className="tease">{teaseText}</div>

            <div className="button-area">
              <button
                className="yes"
                style={{ transform: `scale(${yesScale})` }}
                onClick={handleYes}
              >
                Yes 💖
              </button>

              <button
                className="no"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
                }}
                onMouseEnter={dodgeNo}
                onMouseMove={dodgeNo}
              >
                No 🙃
              </button>
            </div>

            <footer>
              The "no" button seems a bit shy 🙈
            </footer>
          </>
        ) : (
          <>
            <h1 className="success-title">OMG YOU SAID YES 😭💖</h1>

            <img
              className="success-gif"
              src="https://media.giphy.com/media/3o6fJ1BM7R2EBRDnxK/giphy.gif"
              alt="Excited celebration gif"
            />

            <p className="success-text">
              I knew it. I literally knew it 😌
            </p>

            <button
              className="reset"
              onClick={() => {
                setAccepted(false);
                setNoPos({ x: 0, y: 0 });
                setNoScale(1);
                setYesScale(1);
                setTeaseText("Go on… pick one 😌");
              }}
            >
              Ask again 🔁
            </button>

            <footer>
              🛠️ the No button is damaged sadly 😆
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
