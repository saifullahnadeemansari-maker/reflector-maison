export const DEVICE_KEYS = [
  "iphone",
  "android",
  "macbook",
  "laptop",
  "desktop",
] as const;

export type DeviceKey = (typeof DEVICE_KEYS)[number];

export const DEVICE_LABELS: Record<DeviceKey, string> = {
  iphone: "iPhone · iOS 27 glass",
  android: "Android · Material",
  macbook: "MacBook · macOS",
  laptop: "Laptop",
  desktop: "Computer",
};

export function detectDevice(): DeviceKey {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const touch = navigator.maxTouchPoints > 0;
  const width = window.innerWidth;
  const height = window.innerHeight;

  if (/iPhone/i.test(ua)) return "iphone";
  if (/Android/i.test(ua)) return "android";

  const isIPad =
    /iPad/i.test(ua) ||
    (platform === "MacIntel" && touch) ||
    (/Macintosh/i.test(ua) && touch);

  if (isIPad) {
    return width >= 1024 ? "macbook" : "iphone";
  }

  const isMac = /Mac OS X|Macintosh/i.test(ua) && !touch;
  if (isMac) return "macbook";

  if (width <= 1280 || (touch && width <= 1366) || height <= 800) {
    return "laptop";
  }

  return "desktop";
}

export function isValidDevice(value: string | null): value is DeviceKey {
  return DEVICE_KEYS.includes(value as DeviceKey);
}
