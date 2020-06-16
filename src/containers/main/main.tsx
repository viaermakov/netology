import * as React from "react";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";

import { IStore } from "model/store";
import {
  getPersons,
  addFavouritePerson,
  addAllFavouritePerson,
} from "model/actions";

import { IPerson } from "src/types";

import { Table } from "components/table";

import styles from "./main.scss";

type AppDispatch = ThunkDispatch<IStore, any, AnyAction>;

interface IMainContainerProps {}

interface IFavouriteState {
  favouritesIds: number[];
  isChoseAll: boolean;
}

export interface IPersonsState {
  persons: IPerson[];
  personsHash: { [key: string]: IPerson };
}

const Main: React.FC<IMainContainerProps> = ({}) => {
  const dispatch: AppDispatch = useDispatch();

  const personsState = useSelector<IStore, IPersonsState>((state) => ({
    persons: state.main.persons,
    personsHash: state.main.personsHash,
  }));

  const isLoading = useSelector<IStore, boolean>(
    (state) => state.main.isLoading
  );
  const favouriteState = useSelector<IStore, IFavouriteState>((state) => {
    return {
      favouritesIds: state.main.favourite,
      isChoseAll: state.main.isChoseAll,
    };
  });

  React.useEffect(() => {
    dispatch(getPersons());
  }, [dispatch]);

  const handleAddFavourite = React.useCallback(
    (id: number | undefined) => {
      if (id === undefined) {
        dispatch(addAllFavouritePerson());
        return;
      }
      dispatch(addFavouritePerson(id));
    },
    [dispatch]
  );

  return (
    <div className={styles.layout}>
      <Table
        personsState={personsState}
        isLoading={isLoading}
        onAddFavourite={handleAddFavourite}
        favouritesIds={favouriteState.favouritesIds}
        isChoseAll={favouriteState.isChoseAll}
      />
    </div>
  );
};

export default Main;
