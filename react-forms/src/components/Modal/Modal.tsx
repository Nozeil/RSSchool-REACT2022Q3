import React from 'react';
import { defualtModalValues } from './Modal.enums';
import { ModalPropsI } from './Modal.interfaces';
import cl from './Modal.module.css';

class Modal extends React.Component<ModalPropsI> {
  onClick = () => {
    this.props.setModal(false);
  };

  render() {
    const { description, tags, src, title, subtitle } = this.props;
    const newDescription = description ? description : defualtModalValues.description;
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
        <div className={cl.overlay} onClick={this.onClick} />
        <div className={cl.modal}>
          <div className={cl.closeBtn} onClick={this.onClick} />
          <div className={cl.content}>
            <img className={cl.img} src={src} alt="photo" />
            <div className={cl.info}>
              <h3>{title}</h3>
              <h3>By {subtitle}</h3>
              <div dangerouslySetInnerHTML={{ __html: newDescription }} />
              <div className={cl.tags}>{tagsContent}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Modal;
