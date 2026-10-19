import { useEffect, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { Icon } from "./Icon";

interface RailControlsProps {
  railRef: RefObject<HTMLDivElement | null>;
  label: string;
  motion: boolean;
  refreshKey?: string;
  children?: ReactNode;
}
export default function RailControls({
  railRef,
  label,
  motion,
  refreshKey,
  children,
}: RailControlsProps) {
  const [edges, setEdges] = useState({ left: true, right: true });
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const next = {
        left: rail.scrollLeft <= 2,
        right: rail.scrollLeft >= max - 2,
      };
      setEdges((old) =>
        old.left === next.left && old.right === next.right ? old : next,
      );
    };
    const frame = requestAnimationFrame(measure);
    rail.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    resizeObserver?.observe(rail);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
    };
  }, [railRef, refreshKey]);
  const scroll = (direction: number) =>
    railRef.current?.scrollBy({
      left: railRef.current.clientWidth * 0.8 * direction,
      behavior: motion ? "smooth" : "auto",
    });
  return (
    <div className="rail-controls">
      {children}
      <button
        type="button"
        className="round-button"
        onClick={() => scroll(-1)}
        disabled={edges.left}
        aria-label={`Previous ${label}`}
      >
        <Icon name="chevron" className="flip" />
      </button>
      <button
        type="button"
        className="round-button"
        onClick={() => scroll(1)}
        disabled={edges.right}
        aria-label={`Next ${label}`}
      >
        <Icon name="chevron" />
      </button>
    </div>
  );
}
