import * as React from "react";
import cls from "classnames";

import { IPerson } from "src/types";

import styles from "./row.scss";
import { Checkbox } from "../checkbox";

interface ITableComponentProps {
  person?: IPerson;
  isFavourite?: boolean;
  isChoseAll?: boolean;
  onAddFavourite: (id: number | undefined) => void;
}

const MAX_WIDTH = "(max-width: 767px)";
function getMatchMedia(): MediaQueryList {
  return window.matchMedia(MAX_WIDTH);
}

const matchMedia = getMatchMedia();

const Row: React.FC<ITableComponentProps> = ({
  person,
  onAddFavourite,
  isFavourite = false,
  isChoseAll = false,
}) => {
  const isHeader = !Boolean(person);
  const [isMobile, setIsMobile] = React.useState(matchMedia.matches);

  React.useEffect(() => {
    const checkMatchMedia = (matchMedia: MediaQueryListEvent) => {
      setIsMobile(matchMedia.matches);
    };
    matchMedia.addListener(checkMatchMedia);
  }, []);

  const handleAddToFavourite = React.useCallback(() => {
    onAddFavourite(person?.id);
  }, [onAddFavourite, person]);

  const renderCheckbox = () => {
    const checkbox = (
      <Checkbox
        onClick={handleAddToFavourite}
        isActive={person ? Boolean(isFavourite) : isChoseAll}
        className={cls({ [styles.checkbox]: !isHeader })}
      />
    );

    if (!isMobile) {
      return <div className={styles.cell}>{checkbox}</div>;
    }

    if (isHeader) {
      return <>Choose all: {checkbox}</>;
    }

    return checkbox;
  };

  return (
    <div
      key={person?.id || -1}
      className={cls(styles.row, { [styles.isHeader]: isHeader })}
    >
      {renderCheckbox()}
      <div className={cls(styles.cell, styles.text)}>
        <div className={styles.name}>{person?.name || "Name"}</div>
        {person && <div className={styles.phrase}>{person.phrase}</div>}
      </div>
      <div className={styles.cell}>{person?.phone || "Phone"}</div>
      <div className={styles.cell}>{person?.age || ""} years old</div>
    </div>
  );
};

export default React.memo(Row);
