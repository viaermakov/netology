import * as React from "react";
import cls from "classnames";

import { IPerson } from "src/types";
import Row from "./row";

import styles from "./table.scss";
import { IPersonsState } from "src/containers/main/main";

interface ITableComponentProps {
  personsState: IPersonsState;
  onAddFavourite: (id: number | undefined) => void;
  favouritesIds: number[];
  isChoseAll: boolean;
  isLoading: boolean;
}

const Table: React.FC<ITableComponentProps> = ({
  personsState,
  onAddFavourite,
  favouritesIds,
  isLoading,
  isChoseAll,
}) => {
  const { persons, personsHash } = personsState;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!persons || persons.length === 0) {
    return <div>No results. Try to use other filters...</div>;
  }

  const renderRow = (person: IPerson): React.ReactElement | null => {
    return (
      <Row
        key={person.id}
        person={person}
        onAddFavourite={onAddFavourite}
        isFavourite={favouritesIds.includes(person.id)}
      />
    );
  };

  const renderFooter = () => {
    const names = favouritesIds
      .map((id) => {
        return personsHash[id].name;
      })
      .join(", ");

    if (names) {
      return <div className={styles.footer}>You choose: {names}.</div>;
    }

    return null;
  };

  return (
    <div className={cls(styles.standartTable)}>
      <div className={styles.header}>
        <Row key={0} onAddFavourite={onAddFavourite} isChoseAll={isChoseAll} />
      </div>
      {persons.map((person) => renderRow(person))}
      {renderFooter()}
    </div>
  );
};

export default React.memo(Table);
