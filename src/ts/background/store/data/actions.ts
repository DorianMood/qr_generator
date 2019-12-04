import { Action } from 'redux';
import { IData } from './reducer';

export type DataActionTypes = 'DATA_STORE';
export type DataPayload = IData;

export type DataActions = Action<DataActionTypes, DataPayload>;

export const dataStore = (payload: DataPayload = {link: '', content: '', price: 0}) => ({ type: 'DATA_STORE', payload });
