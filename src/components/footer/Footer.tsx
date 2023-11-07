"use client"
import React, { useState } from "react";
import styles from "./footer.module.css";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineGlobal,
  AiOutlineShareAlt,
} from "react-icons/ai";

import ShareModal from "@components/modals/ShareModal";


function Footer() {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <>
      {showShareModal && (
        <ShareModal setShowShareModal={setShowShareModal} />
      )}
      <footer className={styles.footer}>
        <div className={styles.footer__socials}>
          {/* github, links etc  */}
          <a
            className={styles.footer__socials__icon}
            href="https://github.com/decentragora"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub size={24} />
          </a>
          <a
            className={styles.footer__socials__icon}
            href="https://twitter.com/0xOrphan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter size={24} />
          </a>
          <a
            className={styles.footer__socials__icon}
            href="https://decentragora.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGlobal size={24} />
          </a>
          <a
            className={styles.footer__socials__icon}
          >
            <AiOutlineShareAlt size={24} onClick={() => setShowShareModal(true)} />
          </a>
        </div>
        <div className={styles.footer__donate}>
          <p>
            are you an enjoyer of the site? consider donating to dadlessnsad.eth,
            to help keep it running!
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
