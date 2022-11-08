import { log } from 'console';
import React, { DragEvent, useState } from 'react';
import { useAppSelector } from '../../../../../hooks/redux-hooks';
import { useVoc } from '../../../../../hooks/vocabulary-hooks';
import classes from './DropZones.module.scss';

const DropZones: React.FC = () => {
  const voc = useVoc();
  const [hover, setHover] = useState({ fav: false, del: false });
  const starIcon = useAppSelector(
    (state) => state.vocabularySlice.visual.dragAndDrop.starIcon
  );

  const dropFav = (e: DragEvent<HTMLDivElement>) => {
    const wordId = e.dataTransfer.getData('wordId');
    voc.toggleFav(+wordId);
  };

  const dropDel = (e: DragEvent<HTMLDivElement>) => {
    const wordId = e.dataTransfer.getData('wordId');
    voc.deleteWord(+wordId);
  };

  const dragOver = (e: DragEvent<HTMLDivElement>, type: 'fav' | 'del') => {
    e.preventDefault();

    switch (type) {
      case 'fav':
        setHover((prev) => ({ ...prev, fav: true }));
        break;
      case 'del':
        setHover((prev) => ({ ...prev, del: true }));
    }
  };

  const dragLeave = (e: DragEvent<HTMLDivElement>, type: 'fav' | 'del') => {
    e.preventDefault();
    switch (type) {
      case 'fav':
        setHover((prev) => ({ ...prev, fav: false }));
        break;
      case 'del':
        setHover((prev) => ({ ...prev, del: false }));
    }
  };

  return (
    <div className={classes.dropZones}>
      <div
        className={classes.zone + ' ' + classes.favoriteZone}
        onDragEnter={(e) => dragOver(e, 'fav')}
        onDragLeave={(e) => dragLeave(e, 'fav')}
        onDrop={dropFav}
        hover-drag={hover.fav ? 'true' : 'false'}
      >
        {starIcon}
      </div>
      <div
        className={classes.zone + ' ' + classes.deleteZone}
        onDragOver={(e) => dragOver(e, 'del')}
        onDragLeave={(e) => dragLeave(e, 'del')}
        onDrop={dropDel}
        hover-drag={hover.del ? 'true' : 'false'}
      >
        🗑
      </div>
    </div>
  );
};

export default DropZones;
