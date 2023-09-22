import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './comments.module.css';
import { CommentType, ItemType } from '../../../types/types';

type CommentsProps = {
  items: Array<ItemType>;
  comments: Array<CommentType>;
  setComments: (items: Array<CommentType>) => void;
  setItems: (items: Array<ItemType>) => void;
  activeItem: ItemType | null;
  setActiveItem: any;
};

const Comments = ({
  items,
  activeItem,
  comments,
  setComments,
  setActiveItem,
  setItems,
}: CommentsProps) => {
  const [input, setInput] = useState('');
  const [color, setColor] = useState('#000000');
  const handleAddComment = (comment: CommentType) => {
    // items.map((item) => item.comments.push(comment));
    if (activeItem?.id !== comment.id) activeItem?.comments.push(comment);
    const newComment = [...comments, comment];
    setComments(newComment);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLTextAreaElement;
    setInput(target.value);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    setColor(target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input === '') return;
    setInput('');
    handleAddComment({
      id: Math.floor(10000000 + Math.random() * 90000000),
      description: input,
      color: color,
    });
  };

  const currentCommentId = items.find(
    (comment: any) => comment.id === activeItem?.id
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Comments #{currentCommentId?.id || items[0]?.id}
      </h3>
      {activeItem?.comments.map((comment: CommentType) => (
        <div key={comment.id} className={styles.comment}>
          <div
            className={styles.commentColor}
            style={{ backgroundColor: comment.color }}
          ></div>
          <div className={styles.commentBody}>
            <pre className={styles.commentText}>{comment.description}</pre>
          </div>
        </div>
      ))}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.colorInput}
          value={color}
          onChange={handleChangeColor}
          type='color'
        />
        <textarea
          required
          className={styles.textArea}
          placeholder='Type comment here...'
          onChange={handleChange}
          value={input}
        />
        <button className={styles.btn} type='submit'>
          Add New
        </button>
      </form>
    </div>
  );
};

export default Comments;
