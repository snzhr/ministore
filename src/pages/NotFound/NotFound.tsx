import React from 'react'
import styles from './NotFound.module.scss';

function NotFound() {
  return (
    <div className={styles.notfound}>
      <h1>404</h1>
      <p>Page not found.</p>
    </div>
  )
}

export default NotFound;