import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {columnsDataType,columnsType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'


export interface CPRKDState{
    startDate:dayjs.Dayjs,
    endDate:dayjs.Dayjs,
    columnsData?:columnsDataType[] | undefined,
    columns?:columnsType[] | undefined
}



export interface StartDateAction { type: 'StartDateAction_Act', value: dayjs.Dayjs }
export interface EndDateAction { type: 'EndDateAction_Act', value: dayjs.Dayjs }
export interface ColumnsDataAction { type: 'ColumnsDataAction_Act', value: columnsDataType[] }
export interface ColumnsAction { type: 'ColumnsAction_Act', value: columnsType[] }


export type KnownAction = StartDateAction | EndDateAction | ColumnsDataAction | ColumnsAction;


export const actionCreators = {
    _startDate:(value: dayjs.Dayjs)=>({type: 'StartDateAction_Act',value:value} as StartDateAction),
    _endDate:(value: dayjs.Dayjs)=>({type: 'EndDateAction_Act',value:value} as EndDateAction),
    _columnsData:(value: columnsDataType[])=>({type: 'ColumnsDataAction_Act',value:value} as ColumnsDataAction),
    _columns:(value: columnsType[])=>({type: 'ColumnsAction_Act',value:value} as ColumnsAction),

}


export const reducer:Reducer<CPRKDState> = (state: CPRKDState | undefined, incomingAction: Action): CPRKDState => {
    if (state === undefined) {
        return { 
            startDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            endDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            columnsData:new Array<columnsDataType>(),
            columns:new Array<columnsType>()
     };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'StartDateAction_Act':
            return { ...state, startDate: action.value };
        case 'EndDateAction_Act':
            return { ...state, endDate: action.value };
        case 'ColumnsDataAction_Act':
            return { ...state, columnsData: action.value };
        case 'ColumnsAction_Act':
            return { ...state, columns: action.value };
        default:
            return state;
    }

}
