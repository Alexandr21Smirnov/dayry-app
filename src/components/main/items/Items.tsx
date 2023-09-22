import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
} from 'react';
import styles from './items.module.css';
import Item from './item/Item';
import { CommentType, ItemType } from '../../../types/types';

type ItemsProps = {
  items: Array<ItemType>;
  activeItem: any;
  comments: Array<CommentType>;
  setItems: (items: Array<ItemType>) => void;
  setComments: (items: Array<CommentType>) => void;
  setActiveItem: (activeItem: ItemType | null) => void;
};

const Items = ({
  items,
  comments,
  activeItem,
  setItems,
  setComments,
  setActiveItem,
}: ItemsProps) => {
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddItem = (item: ItemType) => {
    const newItem = [...items, item];
    setItems(newItem);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  const handleDelete = useCallback(
    (id: number) => {
      setItems(items.filter((item: ItemType) => item.id !== id));
      activeItem!.comments.length = 0;
    },
    [items]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input === '') return;
    setInput('');

    handleAddItem({
      id: Math.floor(10000000 + Math.random() * 90000000),
      text: input,
      comments: comments,
    });
  };

  const handleActiveItem = (index: number, item: ItemType) => {
    setSelectedIndex(index);
    setActiveItem(item);
    localStorage.setItem('activeItem', JSON.stringify(item));
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Items</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          required
          className={styles.input}
          type='text'
          placeholder='Type name here...'
          onChange={handleChange}
          value={input}
        />
        <button className={styles.btn} type='submit'>
          Add New
        </button>
      </form>
      <ul className={styles.list}>
        {items.map((item: ItemType, index: number) => (
          <span
            key={item?.id}
            onClick={() => handleActiveItem(index, item)}
            className={selectedIndex === index ? styles.active : ''}
          >
            <Item item={item}  comments={comments} handleDelete={handleDelete} />
          </span>
        ))}
      </ul>
    </div>
  );
};

export default Items;
