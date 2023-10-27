import React from "react";
import styles from "./footer.module.css";
import {
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineLink,
} from "react-icons/ai";

function Footer() {
  return (
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
          <AiOutlineLink size={24} />
        </a>
      </div>
      <div className={styles.footer__donate}>
        <p>
          are you a enjoyer of the site? consider donating to dadlessnsad.eth,
          to help keep it running!
        </p>
      </div>
    </footer>
  );
}

export default Footer;
