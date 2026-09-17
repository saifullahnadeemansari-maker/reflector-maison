"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDevice } from "./DeviceProvider";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/maison", label: "Maison" },
  { href: "/boutiques", label: "Boutiques" },
  { href: "/contact", label: "Atelier" },
];

export function Header() {
  const pathname = usePathname();
  const { device, autoDevice, setDevice, keys, labels, locked } = useDevice();
  const [menu, setMenu] = useState(false);
  const [themes, setThemes] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark">R</span>
          <span className="brand-word">REFLECTOR</span>
        </Link>

        <nav className="desk-nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname.startsWith(link.href) ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="ghost-btn"
            onClick={() => setThemes((v) => !v)}
            aria-expanded={themes}
          >
            {labels[device].split(" · ")[0]}
          </button>
          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenu((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {themes && (
        <div className="theme-tray">
          <p>Device look</p>
          <div className="theme-row">
            <button
              type="button"
              className={!locked ? "chip active" : "chip"}
              onClick={() => setDevice("auto")}
            >
              Auto · {labels[autoDevice].split(" · ")[0]}
            </button>
            {keys.map((key) => (
              <button
                key={key}
                type="button"
                className={locked && device === key ? "chip active" : "chip"}
                onClick={() => setDevice(key)}
              >
                {labels[key]}
              </button>
            ))}
          </div>
        </div>
      )}

      {menu && (
        <nav className="mobile-panel" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenu(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
