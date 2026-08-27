import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, ArrowUpRight } from "lucide-react";
import { FaTelegramPlane, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <motion.div
            className="contact-modal"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="contact-modal__header">
              <div className="brand-mini">
                <img src="/logo.png" alt="AIGES" style={{ height: "14px", filter: "brightness(0)" }} />
              </div>
              <button className="contact-modal__close" onClick={onClose} aria-label="Close contact modal">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <h2 id="contact-modal-title" className="contact-modal__title">
              LET'S START<br />A PROJECT<sup style={{ fontSize: "0.4em", top: "-0.8em" }}>©</sup>
              <span className="contact-modal__dot"></span>
            </h2>

            <div className="contact-modal__list">
              <a href="tel:+77023734299" className="contact-modal__row">
                <div className="contact-modal__icon"><Phone size={20} strokeWidth={1.5} /></div>
                <div className="contact-modal__content">
                  <span className="contact-modal__label">PHONE 01</span>
                  <span className="contact-modal__value">+7 702 373 42 99</span>
                </div>
                <ArrowUpRight className="contact-modal__arrow" size={20} strokeWidth={1.5} />
              </a>

              <a href="tel:+77018488086" className="contact-modal__row">
                <div className="contact-modal__icon"><Phone size={20} strokeWidth={1.5} /></div>
                <div className="contact-modal__content">
                  <span className="contact-modal__label">PHONE 02</span>
                  <span className="contact-modal__value">+7 701 848 80 86</span>
                </div>
                <ArrowUpRight className="contact-modal__arrow" size={20} strokeWidth={1.5} />
              </a>

              <a href="https://t.me/aigeskz" target="_blank" rel="noopener noreferrer" className="contact-modal__row">
                <div className="contact-modal__icon"><FaTelegramPlane size={20} /></div>
                <div className="contact-modal__content">
                  <span className="contact-modal__label">TELEGRAM</span>
                  <span className="contact-modal__value">@aigeskz</span>
                </div>
                <ArrowUpRight className="contact-modal__arrow" size={20} strokeWidth={1.5} />
              </a>

              <a href="https://www.instagram.com/aiges.studio" target="_blank" rel="noopener noreferrer" className="contact-modal__row">
                <div className="contact-modal__icon"><FaInstagram size={20} /></div>
                <div className="contact-modal__content">
                  <span className="contact-modal__label">INSTAGRAM</span>
                  <span className="contact-modal__value">@aiges.studio</span>
                </div>
                <ArrowUpRight className="contact-modal__arrow" size={20} strokeWidth={1.5} />
              </a>

              <a href="https://www.linkedin.com/in/%D0%B7%D0%B0%D1%80%D0%B8%D0%BD%D0%B0-%D1%81%D0%B5%D1%80%D0%B8%D0%BC%D0%B1%D0%B5%D1%82%D0%BE%D0%B2%D0%B0-2507b142a/" target="_blank" rel="noopener noreferrer" className="contact-modal__row">
                <div className="contact-modal__icon"><FaLinkedinIn size={20} /></div>
                <div className="contact-modal__content">
                  <span className="contact-modal__label">LINKEDIN</span>
                  <span className="contact-modal__value">Zarina Serimbetova</span>
                </div>
                <ArrowUpRight className="contact-modal__arrow" size={20} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

