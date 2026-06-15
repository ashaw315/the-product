"use client";
import { useState } from "react";
import styles from "./dashboard.module.css";

export const DISCOVERY_ENTRIES = [
  {
    name: "North Star Metric",
    description:
      "The product's primary self-referential measure — a monotonically increasing signal of accumulated scope.",
  },
  {
    name: "Engagement Dashboard",
    description:
      "A live count of every session with this product, rendered as a named metric.",
  },
  {
    name: "Velocity Panel",
    description:
      "Sprint-over-sprint momentum displayed as a signed directional delta.",
  },
  {
    name: "NPS Lift Index",
    description:
      "A secondary hero metric signaling the product's resonance with the user who is already here.",
  },
  {
    name: "Guided Orientation Banner",
    description:
      "A navigation layer that links the user toward the product's key surfaces and views.",
  },
  {
    name: "Return Beacon",
    description:
      "The above-the-fold orientation signal that greets the returning user with a live metric.",
  },
  {
    name: "Anticipation Layer",
    description:
      "The below-the-fold trajectory signal built from the product's shipping cadence.",
  },
  {
    name: "Navigable Surface Index",
    description:
      "A structured, browsable index of every named surface and component modality in this product.",
  },
  {
    name: "Product Completeness Signal",
    description:
      "A concise statement of accumulated scope: features and sprints, stated plainly.",
  },
];

export function DiscoveryRibbon() {
  const [index, setIndex] = useState(0);
  const entry = DISCOVERY_ENTRIES[index];

  const handlePrev = () => {
    setIndex((i) => (i - 1 + DISCOVERY_ENTRIES.length) % DISCOVERY_ENTRIES.length);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % DISCOVERY_ENTRIES.length);
  };

  return (
    <div
      aria-label="discovery ribbon"
      data-testid="discovery-ribbon"
      className={styles.discoveryRibbon}
    >
      <button
        onClick={handlePrev}
        aria-label="previous feature"
        className={styles.ribbonNav}
      >
        ←
      </button>
      <div className={styles.ribbonContent}>
        <span
          className={`${styles.ribbonName} label`}
          data-testid="ribbon-entry-name"
        >
          {entry.name}
        </span>
        <span
          className={`${styles.ribbonDesc} label`}
          data-testid="ribbon-entry-desc"
        >
          {entry.description}
        </span>
      </div>
      <button
        onClick={handleNext}
        aria-label="next feature"
        className={styles.ribbonNav}
      >
        →
      </button>
    </div>
  );
}

export default DiscoveryRibbon;
