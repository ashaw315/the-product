"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type InteractivitySignalLayerProps = {
  children?: ReactNode;
  isActive?: boolean;
};

export function InteractivitySignalLayer({
  children,
  isActive = false,
}: InteractivitySignalLayerProps) {
  const [active, setActive] = useState(isActive);

  return (
    <div
      className={active ? "signal-active" : "signal-idle"}
      data-active={String(active)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {children}
    </div>
  );
}

export default InteractivitySignalLayer;
