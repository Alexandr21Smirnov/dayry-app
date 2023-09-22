import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>DAYRY APP</h1>
      <h3 className={styles.description}>Comment with no sense</h3>
    </aside>
  );
};

export default Sidebar;
