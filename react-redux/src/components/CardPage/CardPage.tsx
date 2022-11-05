import { TestIds } from 'enums';
import React from 'react';
import { defualtCardPageValues } from './CardPage.enums';
import cl from './CardPage.module.css';
import dompurify from 'dompurify';
import useAppContext from 'app/AppContext';
import { Link } from 'react-router-dom';

const CardPage = () => {
  const { appState } = useAppContext();
  const { cardPageData } = appState;
  const { title, subtitle, description, tags, src } = cardPageData;

  const newDescription = description ? description : defualtCardPageValues.description;
  const cleanDescription = dompurify.sanitize(newDescription, { USE_PROFILES: { html: true } });
  const tagsContent = tags.length ? (
    tags.map((tag) => (
      <div key={tag.id} className={cl.tag}>
        {tag._content}
      </div>
    ))
  ) : (
    <div className={cl.tag}>{defualtCardPageValues.tags}</div>
  );

  return (
    <div data-testid={TestIds.cardPage}>
      <div className={cl.content}>
        <Link to="/" className={cl.link}>
          Back
        </Link>
        <img className={cl.img} src={src} alt="photo" data-testid={TestIds.cardPageImg} />
        <div className={cl.info}>
          <h3>{title}</h3>
          <h3>By {subtitle}</h3>
          <div dangerouslySetInnerHTML={{ __html: cleanDescription }} />
          <div className={cl.tags}>{tagsContent}</div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
