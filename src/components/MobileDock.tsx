"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDevice } from "./DeviceProvider";

const items = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Watches" },
  { href: "/maison", label: "Maison" },
  { href: "/contact", label: "Atelier" },
];

export function MobileDock() {
  const { device } = useDevice();
  const pathname = usePathname();
  if (device !== "iphone" && device !== "android") return null;

  return (
    <nav className="mobile-dock" aria-label="Phone navigation">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={active ? "dock-item active" : "dock-item"}>
            <i />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
