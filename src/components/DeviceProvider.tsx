"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEVICE_KEYS,
  DEVICE_LABELS,
  detectDevice,
  isValidDevice,
  type DeviceKey,
} from "@/lib/device";

type DeviceContextValue = {
  device: DeviceKey;
  autoDevice: DeviceKey;
  locked: boolean;
  setDevice: (next: DeviceKey | "auto") => void;
  labels: typeof DEVICE_LABELS;
  keys: typeof DEVICE_KEYS;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);
const STORAGE_KEY = "reflector-device-theme";

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [autoDevice, setAutoDevice] = useState<DeviceKey>("desktop");
  const [override, setOverride] = useState<DeviceKey | null>(null);
  const [ready, setReady] = useState(false);

  const apply = useCallback((key: DeviceKey) => {
    document.documentElement.dataset.device = key;
    document.documentElement.style.colorScheme = "dark";
  }, []);

  useEffect(() => {
    const detected = detectDevice();
    setAutoDevice(detected);
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next = isValidDevice(saved) ? saved : detected;
    setOverride(isValidDevice(saved) ? saved : null);
    apply(next);
    setReady(true);

    const onResize = () => {
      const fresh = detectDevice();
      setAutoDevice(fresh);
      if (!window.localStorage.getItem(STORAGE_KEY)) apply(fresh);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [apply]);

  const device = override ?? autoDevice;

  const setDevice = useCallback(
    (next: DeviceKey | "auto") => {
      if (next === "auto") {
        window.localStorage.removeItem(STORAGE_KEY);
        setOverride(null);
        apply(detectDevice());
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, next);
      setOverride(next);
      apply(next);
    },
    [apply],
  );

  const value = useMemo(
    () => ({
      device,
      autoDevice,
      locked: override !== null,
      setDevice,
      labels: DEVICE_LABELS,
      keys: DEVICE_KEYS,
    }),
    [autoDevice, device, override, setDevice],
  );

  return (
    <DeviceContext.Provider value={value}>
      <div className={ready ? "app-ready" : "app-boot"}>{children}</div>
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevice must be used inside DeviceProvider");
  return ctx;
}
