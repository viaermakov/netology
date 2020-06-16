import { IPerson } from "../types";
import {
  PERSONS_DATA_FAILURE,
  PERSONS_DATA_REQUEST,
  PERSONS_DATA_SUCCESS,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
  ADD_ALL_FAVOURITE,
} from "./types";
import { getPersonsApi } from "src/services/api";
import { Dispatch } from "redux";

export interface IPersonsDataRequest {
  type: PERSONS_DATA_REQUEST;
}

export interface IPersonsDataSuccess {
  type: PERSONS_DATA_SUCCESS;
  payload: {
    persons: IPerson[];
    personsHash: IPersonsHash;
  };
}

export interface IPersonsDataFailure {
  type: PERSONS_DATA_FAILURE;
  payload: any;
}

export interface IAddFavouritePerson {
  type: ADD_FAVOURITE;
  payload: number;
}

export interface IDeleteFavouritePerson {
  type: DELETE_FAVOURITE;
  payload: number;
}

export type getPersonsDataActionType =
  | PERSONS_DATA_FAILURE
  | PERSONS_DATA_REQUEST
  | PERSONS_DATA_SUCCESS
  | ADD_FAVOURITE
  | ADD_ALL_FAVOURITE;

export interface IPersonsDataAction {
  type: getPersonsDataActionType;
  payload?: any;
}

interface IPersonsHash {
  [key: string]: IPerson;
}
export function getPersons() {
  return async (dispatch: Dispatch<IPersonsDataAction>): Promise<void> => {
    dispatch(getPersonsData());
    const persons = await getPersonsApi();
    const personsHash = persons.reduce((acc: IPersonsHash, person) => {
      acc[person.id] = person;
      return acc;
    }, {});
    dispatch(getPersonsDataSuccess({ persons, personsHash }));
  };
}

export function getPersonsData(): IPersonsDataRequest {
  return {
    type: PERSONS_DATA_REQUEST,
  };
}

export function getPersonsDataSuccess(data: {
  persons: IPerson[];
  personsHash: IPersonsHash;
}): IPersonsDataSuccess {
  return {
    type: PERSONS_DATA_SUCCESS,
    payload: data,
  };
}

export function getPersonsDataFailure(value: string): IPersonsDataFailure {
  return {
    type: PERSONS_DATA_FAILURE,
    payload: { value },
  };
}

export function addFavouritePerson(value: number): IAddFavouritePerson {
  return {
    type: ADD_FAVOURITE,
    payload: value,
  };
}

export function addAllFavouritePerson(): {
  type: ADD_ALL_FAVOURITE;
} {
  return {
    type: ADD_ALL_FAVOURITE,
  };
}

export function deleteFavouritePerson(value: number): IDeleteFavouritePerson {
  return {
    type: DELETE_FAVOURITE,
    payload: value,
  };
}
