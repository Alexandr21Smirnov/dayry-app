import Items from './items/Items';
import styles from './main.module.css';
import Comments from './comments/Comments';
import { CommentType, ItemType } from '../../types/types';
import { useEffect, useState } from 'react';

const Main = () => {
  const [comments, setComments] = useState([
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      description: 'Test',
      color: '#000000',
    },
  ]);

  const [items, setItems] = useState<ItemType[]>([
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      text: 'Test',
      comments: comments,
    },
  ]);

  const storedActiveItem = JSON.parse(localStorage.getItem('activeItem')!);
  const [activeItem, setActiveItem] = useState<ItemType | null>(
    storedActiveItem || {
      id: Math.floor(10000000 + Math.random() * 90000000),
      text: 'Test',
      comments: comments,
    }
  );

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')!);
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    if (items?.length) {
      localStorage.setItem('items', JSON.stringify(items));
    }
    return () => {
      localStorage.clear();
    };
  }, [items]);

  return (
    <div className={styles.main}>
      <Items
        activeItem={activeItem}
        items={items}
        setItems={setItems}
        comments={comments}
        setComments={setComments}
        setActiveItem={setActiveItem}
      />
      <Comments
        items={items}
        comments={comments}
        setActiveItem={setActiveItem}
        setComments={setComments}
        setItems={setItems}
        activeItem={activeItem}
      />
    </div>
  );
};

export default Main;
