import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-100 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-display font-bold text-white">
              Shutter<span className="text-primary-400">scape</span>
            </h3>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              The official photography club of GCU — capturing moments, crafting stories.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2">
              {["/activities", "/gallery", "/about"].map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect
            </h4>
            <div className="mt-3 flex gap-4">
              <a
                href="mailto:shutterscape@gcu.edu"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <HiMail size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
          © {currentYear} Shutterscape GCU. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
