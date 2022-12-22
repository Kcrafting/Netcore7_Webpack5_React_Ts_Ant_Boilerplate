import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {columnsDataType,columnsType,StepsType,BillType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'


export interface CPRKDState{
    startDate:dayjs.Dayjs,
    endDate:dayjs.Dayjs,
    columnsData?:columnsDataType[] | undefined,
    columns?:columnsType[] | undefined,
    currentindex:number,
    steps:StepsType[],
    billTypes:BillType[],
    selectBillTypes:string[],
    showDialog:boolean,
    dialogText:string,
    
}



export interface StartDateAction { type: 'StartDateAction_Act', value: dayjs.Dayjs }
export interface EndDateAction { type: 'EndDateAction_Act', value: dayjs.Dayjs }
export interface ColumnsDataAction { type: 'ColumnsDataAction_Act', value: columnsDataType[] }
export interface ColumnsAction { type: 'ColumnsAction_Act', value: columnsType[] }
export interface CurrentIndexAction { type: 'CurrentIndexAction_Act', value: number }
export interface StepsAction { type: 'StepsAction_Act', value: StepsType[] }
export interface BillTypesAction { type: 'BillTypesAction_Act', value: BillType[] }
export interface SelectBillTypesAction { type: 'SelectBillTypesAction_Act', value: string[] }
export interface ShowDialogAction { type: 'ShowDialogAction_Act', value: boolean }
export interface DialogTextAction { type: 'DialogTextAction_Act', value: string }

export type KnownAction = StartDateAction | EndDateAction | ColumnsDataAction | ColumnsAction | CurrentIndexAction | StepsAction | BillTypesAction | SelectBillTypesAction | ShowDialogAction | DialogTextAction;


export const actionCreators = {
    _startDate:(value: dayjs.Dayjs)=>({type: 'StartDateAction_Act',value:value} as StartDateAction),
    _endDate:(value: dayjs.Dayjs)=>({type: 'EndDateAction_Act',value:value} as EndDateAction),
    _columnsData:(value: columnsDataType[])=>({type: 'ColumnsDataAction_Act',value:value} as ColumnsDataAction),
    _columns:(value: columnsType[])=>({type: 'ColumnsAction_Act',value:value} as ColumnsAction),
    _currentIndex:(value: number)=>({type: 'CurrentIndexAction_Act',value:value} as CurrentIndexAction),
    _steps:(value: StepsType[])=>({type: 'StepsAction_Act',value:value} as StepsAction),
    _billType:(value: BillType[])=>({type: 'BillTypesAction_Act',value:value} as BillTypesAction),
    _selectBillType:(value: string[])=>({type: 'SelectBillTypesAction_Act',value:value} as SelectBillTypesAction),
    _showDialog:(value: boolean)=>({type: 'ShowDialogAction_Act',value:value} as ShowDialogAction),
    _dialogText:(value: string)=>({type: 'DialogTextAction_Act',value:value} as DialogTextAction),
}


export const reducer:Reducer<CPRKDState> = (state: CPRKDState | undefined, incomingAction: Action): CPRKDState => {
    if (state === undefined) {
        return { 
            startDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            endDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            columnsData:new Array<columnsDataType>(),
            columns:new Array<columnsType>(),
            currentindex:3,
            steps:new Array<StepsType>(),
            billTypes:new Array<BillType>(),
            selectBillTypes:new Array<string>(),
            showDialog:false,
            dialogText:''
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
        case 'CurrentIndexAction_Act':
            return { ...state, currentindex: action.value };
        case 'StepsAction_Act':
            return { ...state, steps: action.value };
        case 'BillTypesAction_Act':
            return { ...state, billTypes: action.value };
        case 'SelectBillTypesAction_Act':
            return { ...state, selectBillTypes: action.value };
        case 'ShowDialogAction_Act':
            return { ...state, showDialog: action.value };
        case 'DialogTextAction_Act':
            return { ...state, dialogText: action.value };
        default:
            return state;
    }

}
