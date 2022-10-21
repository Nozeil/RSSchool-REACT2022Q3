import React from 'react';
import { defualtModalValues } from './Modal.enums';
import { ModalPropsI } from './Modal.interfaces';
import cl from './Modal.module.css';

class Modal extends React.Component<ModalPropsI> {
  onClick = () => {
    this.props.toggleModalVisibility(false);
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
        <div className={cl.overlay} onClick={this.onClick} data-testid="overlay" />
        <div className={cl.modal} data-testid="modal">
          <div className={cl.closeBtn} onClick={this.onClick} data-testid="close-button" />
          <div className={cl.content}>
            <img className={cl.img} src={src} alt="photo" data-testid="modal-img" />
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
