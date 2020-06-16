import { IPerson } from "../types";
import { IPersonsDataAction } from "./actions";
import {
  PERSONS_DATA_FAILURE,
  PERSONS_DATA_REQUEST,
  PERSONS_DATA_SUCCESS,
  ADD_FAVOURITE,
  ADD_ALL_FAVOURITE,
} from "./types";

export interface IPersonsStoreState {
  persons: IPerson[];
  isLoading: boolean;
  favourite: number[];
  isChoseAll: boolean;
  personsHash: { [key: string]: IPerson };
}

const initialState: IPersonsStoreState = {
  persons: [],
  isLoading: false,
  favourite: [],
  isChoseAll: false,
  personsHash: {},
};

export function reducer(
  state: IPersonsStoreState = initialState,
  action: IPersonsDataAction
): IPersonsStoreState {
  switch (action.type) {
    case PERSONS_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
        persons: [],
      };
    }
    case PERSONS_DATA_SUCCESS: {
      const { persons, personsHash } = action.payload;
      return {
        ...state,
        isLoading: false,
        personsHash,
        persons,
      };
    }
    case PERSONS_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        persons: [],
        personsHash: {},
      };
    }
    case ADD_FAVOURITE: {
      const isExisting = state.favourite.includes(action.payload);
      const favouriteIds = isExisting
        ? state.favourite.filter((item) => item !== action.payload)
        : [...state.favourite, action.payload];

      return {
        ...state,
        isChoseAll: false,
        favourite: [...favouriteIds],
      };
    }
    case ADD_ALL_FAVOURITE: {
      const isExisting = state.persons.every((person) =>
        state.favourite.includes(person.id)
      );
      const favouriteIds = !isExisting
        ? state.persons.map((person) => person.id)
        : [];

      return {
        ...state,
        isChoseAll: !isExisting,
        favourite: [...favouriteIds],
      };
    }
    default:
      return state;
  }
}
