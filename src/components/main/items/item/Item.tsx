import styles from './item.module.css';
import { CommentType, ItemType } from '../../../../types/types';
import { memo } from 'react';

type ItemProps = {
  handleDelete: (id: number) => void;
  item: ItemType;
  comments: Array<CommentType>;
};

const Item = (props: ItemProps) => {
  return (
    <li className={styles.item}>
      <p>{props.item?.text}</p>
      <div className={styles.flex}>
        <span className={styles.badge}>{props.item.comments?.length}</span>
        <button
          className={styles.deleteBtn}
          onClick={() => props.handleDelete(props.item?.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default memo(Item);
