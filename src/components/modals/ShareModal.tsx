"use client"
import React from 'react'
import styles from './ShareModal.module.css'
import {
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon, 
} from "react-share";


function ShareModal({ setShowShareModal } : { setShowShareModal: Function }) {
  const pageUrl = "https://evmgasstation.xyz"
  const shareTitle = "Get the latest EVM gas prices and optimize your transactions!";
  const shareDescription = "Visit EVM Gas Station to track real-time gas fees and make the most out of your Ethereum experience. Save on fees, time, and hassle with our accurate gas estimates.";


  return (
    <div className={styles.modal__page}>
      <div className={styles.backdrop} onClick={() => setShowShareModal(false)} />
      
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <button
            className={styles.modal__close_button}
            onClick={() => setShowShareModal(false)}
          >
            &times;
          </button>
          <h2 className={styles.modal__title}>Go ahead, share it!</h2>
        </div>
        <div className={styles.modal__body}>
          <div className={styles.modal__share_buttons}>
            
            <TwitterShareButton
              url={pageUrl}
              title={shareTitle}
              hashtags={["Ethereum", "EVM", "EVM Gas Station", "Optimism", "Polygon", "Matic", "Arbitrum", "ZkSync", "Scroll", "Moonbeam" ]}
              className={styles.footer_share_button}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <RedditShareButton
              url={pageUrl}
              title={shareTitle}
              className={styles.footer_share_button}
            >
              <RedditIcon size={32} round />
            </RedditShareButton>

            <TelegramShareButton
              url={pageUrl}
              title={shareTitle}
              className={styles.footer_share_button}
              about={shareDescription}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>            

            <WhatsappShareButton
              url={pageUrl}
              title={shareTitle}
              className={styles.footer_share_button}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <FacebookShareButton
              url={pageUrl}
              quote={shareTitle}
              hashtag="#EVMGasStation"
              className={styles.footer_share_button}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              url={pageUrl}
              title={shareTitle}
              prefix='EVM Gas Station'
              summary={shareDescription}
              className={styles.footer_share_button}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>



          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareModal