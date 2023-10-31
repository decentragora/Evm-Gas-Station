import React from 'react'
import styles from './Header.module.css'
import Image from 'next/image'

function Header() {
  return (
    <header className={styles.header}>
      <Image
        src={"/EvmGasLogo.png"}
        alt="Evm Gas Station Logo"
        width={50}
        height={50}
        style={{
          borderRadius: '50%',
        }}
      />
      <h1 className={styles.title}>
        EVM Gas Station
      </h1>
    </header>
  )
}

export default Header