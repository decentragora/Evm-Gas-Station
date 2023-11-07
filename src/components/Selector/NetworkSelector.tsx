'use client'
import React, { useCallback, useState, useEffect } from 'react'
import { clients } from '@/provider/providers'
import styles from './NetworkSelector.module.css'
import useEmblaCarousel from 'embla-carousel-react'
import { FiInfo, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Tooltip } from 'react-tooltip'

function NetworkSelector({ selectedClient, setSelectedClient, gasData, isLoading }: { selectedClient: string, setSelectedClient: Function, gasData: any, isLoading: boolean }) {
  const [animate, setAnimate] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    containScroll: "keepSnaps",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const HandleNetworkIconClick = (network: string) => {
    setSelectedClient(network)
  }

  useEffect(() => {
    if (!isLoading) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 12000);
    }
  }, [isLoading]);

  return (
      <div className={styles.embla__container}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.network_icons}>
            {Object.keys(clients).map((client, index) => (
              <div className={`${styles.network_icon} ${selectedClient === client ? styles.selected : ''}`} key={index} onClick={() => HandleNetworkIconClick(client)}>
                <div className={`${animate ? styles.shadow_animation : ''}`}></div>
                <div className={`${styles.shadow_animation} ${animate ? styles.animate : ''}`}></div>
                <span className={styles.icon_name}>{client === "homestead" ? "Ethereum" : client}</span>
                <img className={styles.icon_logo} src={`./networks/${client}_Logo.png`} alt={client} />

                  <span className={styles.icon_current_gwei}>
                    {gasData[client] ? (
                      gasData[client].currentGwei >= 1 ? (
                          Number(gasData[client].currentGwei).toFixed(0) + " gwei"
                      ) : (
                        gasData[client] >= 0.1 ? (
                              Number(gasData[client].currentGwei).toFixed(1) + " gwei"
                          ) : (
                              Number(gasData[client].currentGwei).toFixed(2) + " gwei"
                          )
                      )
                  ) : ("...")}
                    {/* <FiInfo 
                      data-tooltip-id="base_fee_tooltip" 
                      data-tooltip-content="The base fee is the minimum amount of gas that a transaction must pay to be included in a block. The base fee is burned, which means that it is removed from circulation. The base fee is calculated based on the network's current demand for block space and adjusts accordingly." 
                      className={styles.info_icon}
                    /> */}
                  </span>

              </div>
            ))}
          </div>
        </div>
        <span className={styles.embla__button_prev} onClick={scrollPrev}>
          <FiChevronLeft />
        </span>
        <span className={styles.embla__button_next} onClick={scrollNext}>
          <FiChevronRight />
        </span>
        <Tooltip 
          id="base_fee_tooltip" 
          style={{ 
            maxWidth: "300px",
            backgroundColor: "rgba(0, 0, 0, 1)",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "14px",
          }} 
        />
      </div>
  )
}

export default NetworkSelector