import React from 'react'
import styles from './Loading.module.css'

function Loading() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loading
