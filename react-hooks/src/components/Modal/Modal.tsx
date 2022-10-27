import { TestIds } from 'enums';
import React from 'react';
import { defualtModalValues } from './Modal.enums';
import { ModalPropsI } from './Modal.interfaces';
import cl from './Modal.module.css';
import dompurify from 'dompurify';

const Modal = ({ setIsModalVisible, description, tags, src, title, subtitle }: ModalPropsI) => {
  const onClick = () => setIsModalVisible(false);
  const newDescription = description ? description : defualtModalValues.description;
  const cleanDescription = dompurify.sanitize(newDescription, { USE_PROFILES: { html: true } });
  const tagsContent = tags.length ? (
    tags.map((tag) => (
      <div key={tag.id} className={cl.tag}>
        {tag._content}
      </div>
    ))
  ) : (
    <div className={cl.tag}>{defualtModalValues.tags}</div>
  );

  return (
    <>
      <div className={cl.overlay} onClick={onClick} data-testid={TestIds.overlay} />
      <div className={cl.modal} data-testid={TestIds.modal}>
        <div className={cl.closeBtn} onClick={onClick} data-testid={TestIds.closeBtn} />
        <div className={cl.content}>
          <img className={cl.img} src={src} alt="photo" data-testid={TestIds.modalImg} />
          <div className={cl.info}>
            <h3>{title}</h3>
            <h3>By {subtitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
            <div className={cl.tags}>{tagsContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
