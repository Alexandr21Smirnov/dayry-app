import { PropsWithChildren } from 'react';
import styles from './wrapper.module.css';

const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
