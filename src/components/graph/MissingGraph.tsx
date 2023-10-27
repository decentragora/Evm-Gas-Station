import React from 'react'
import styles from './gasGraph.module.css'

function MissingGraph() {
  return (
    <div className={styles.gasGraphContainer}>
      {/* Funny message to display when no graph is available */}
      <div className={styles.missingGraph}>
        <span className={styles.missingGraphText}>No graph available</span>
        <span className={styles.missingGraphText}>Try another network</span>
      </div>
    </div>
  )
}

export default MissingGraph