import { useEffect, useState } from "react";
import { projects } from "../data/portfolio";
import type { ViewerProfile } from "../data/portfolio";

export interface PortfolioPreferences {
  profile: ViewerProfile;
  saved: string[];
  explored: string[];
  motion: boolean;
}
const storageKey = "aqib-portfolio-v1";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function readPreferences(): PortfolioPreferences {
  let stored: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(
      localStorage.getItem(storageKey) || "{}",
    );
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed))
      stored = parsed as Record<string, unknown>;
  } catch {
    /* Private browsing can disable persistent storage. */
  }
  return {
    // Every fresh visit starts on Meet Aqib, never on the old profile chooser.
    // Switching profiles in the top-right menu still updates the current session.
    profile: "aqib",
    saved: Array.isArray(stored.saved)
      ? [
          ...new Set(
            stored.saved.filter(
              (id): id is string =>
                typeof id === "string" &&
                projects.some((project) => project.id === id),
            ),
          ),
        ]
      : [],
    explored: Array.isArray(stored.explored)
      ? stored.explored.filter(
          (id): id is string =>
            typeof id === "string" &&
            ["story", "skills", "originals", "contact"].includes(id),
        )
      : [],
    motion:
      typeof stored.motion === "boolean"
        ? stored.motion
        : !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

export function usePortfolioState() {
  const [preferences, setPreferences] =
    useState<PortfolioPreferences>(readPreferences);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {
      /* Saving is optional. */
    }
  }, [preferences]);
  return [preferences, setPreferences] as const;
}
