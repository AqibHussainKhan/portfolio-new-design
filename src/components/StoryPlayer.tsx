import { useEffect, useRef, useState } from "react";
import portrait from "../assets/aqib-portrait.jpg";
import { contactEmail, storyChapters } from "../data/portfolio";
import { Icon } from "./Icon";
import Modal, { CloseButton } from "./Modal";

const chapterDuration = 6500;
export default function StoryPlayer({
  open,
  onClose,
  motion,
}: {
  open: boolean;
  onClose: () => void;
  motion: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const elapsedRef = useRef(0);
  const startingMotionRef = useRef(motion);
  startingMotionRef.current = motion;
  useEffect(() => {
    if (open) {
      setIndex(0);
      setElapsed(0);
      elapsedRef.current = 0;
      setPlaying(startingMotionRef.current);
    } else setPlaying(false);
  }, [open]);
  useEffect(() => {
    if (!motion) setPlaying(false);
  }, [motion]);
  useEffect(() => {
    if (!open || !playing) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      if (!document.hidden) {
        elapsedRef.current = Math.min(
          chapterDuration,
          elapsedRef.current + Math.min(now - previous, 300),
        );
        setElapsed(elapsedRef.current);
        if (elapsedRef.current >= chapterDuration) {
          if (index < storyChapters.length - 1) {
            elapsedRef.current = 0;
            setElapsed(0);
            setIndex(index + 1);
          } else setPlaying(false);
        }
      }
      previous = now;
    }, 100);
    return () => window.clearInterval(timer);
  }, [open, playing, index]);
  const goTo = (next: number) => {
    setIndex(Math.min(storyChapters.length - 1, Math.max(0, next)));
    setElapsed(0);
    elapsedRef.current = 0;
  };
  const togglePlaying = () => {
    if (index === storyChapters.length - 1 && elapsed >= chapterDuration)
      goTo(0);
    setPlaying((value) => !value);
  };
  const chapter = storyChapters[index];
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="trailer-title"
      className="trailer-dialog surface-dialog"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1);
        }
      }}
    >
      <div className="trailer-top">
        <div className="trailer-brand">
          <span className="small-a">A</span> ORIGINAL STORY
        </div>
        <CloseButton onClose={onClose} label="Close portfolio story" />
      </div>
      <div className="trailer-progress">
        {storyChapters.map((item, step) => (
          <button
            type="button"
            key={item.eyebrow}
            className="trailer-chapter"
            aria-label={`Go to chapter ${step + 1}`}
            aria-current={step === index ? "step" : undefined}
            onClick={() => goTo(step)}
          >
            <span
              style={{
                width: `${step < index ? 100 : step === index ? Math.min(100, (elapsed / chapterDuration) * 100) : 0}%`,
              }}
            />
          </button>
        ))}
      </div>
      <div className="trailer-stage">
        {chapter.image ? (
          <div className="trailer-image" aria-hidden="true">
            <img src={portrait} alt="" />
          </div>
        ) : (
          <span className="trailer-number" aria-hidden="true">
            0{index + 1}
          </span>
        )}
        <div className="trailer-slide" key={index}>
          <p className="eyebrow">{chapter.eyebrow}</p>
          <h2 id="trailer-title" style={{ whiteSpace: "pre-line" }}>
            {chapter.title}
          </h2>
          <p>{chapter.text}</p>
          {chapter.contact && (
            <a className="button button-white" href={`mailto:${contactEmail}`}>
              Let's talk <Icon name="up-right" />
            </a>
          )}
        </div>
      </div>
      <div className="trailer-controls">
        <button
          type="button"
          className="round-button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous chapter"
        >
          <Icon name="chevron" className="flip" />
        </button>
        <button
          type="button"
          className="round-button"
          onClick={togglePlaying}
          aria-label={playing ? "Pause story" : "Play story"}
        >
          <Icon name={playing ? "pause" : "play"} />
        </button>
        <span>CHAPTER {String(index + 1).padStart(2, "0")} / 04</span>
        <button
          type="button"
          className="round-button"
          onClick={() => goTo(index + 1)}
          disabled={index === storyChapters.length - 1}
          aria-label="Next chapter"
        >
          <Icon name="chevron" />
        </button>
      </div>
    </Modal>
  );
}
