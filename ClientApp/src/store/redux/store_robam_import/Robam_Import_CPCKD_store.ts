import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {_Row,_Column,StepsType,BillType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'
import { AppThunkAction } from '../..';

export interface CPCKDState{
    startDate:dayjs.Dayjs,
    endDate:dayjs.Dayjs,
    columnsData?:_Row[] | undefined,
    columns?:_Column[] | undefined,
    currentindex:number,
    steps:StepsType[],
    billTypes:BillType[],
    selectBillTypes:string[],
    showDialog:boolean,
    dialogText:string,
    
}

export interface StartDateAction_out { type: 'StartDateAction_out_Act', value: dayjs.Dayjs }
export interface EndDateAction_out { type: 'EndDateAction_out_Act', value: dayjs.Dayjs }
export interface ColumnsDataAction_out { type: 'ColumnsDataAction_out_Act', value: _Row[] }
export interface ColumnsAction_out { type: 'ColumnsAction_out_Act', value: _Column[] }
export interface CurrentIndexAction_out { type: 'CurrentIndexAction_out_Act', value: number }
export interface StepsAction_out { type: 'StepsAction_out_Act', value: StepsType[] }
export interface BillTypesAction_out { type: 'BillTypesAction_out_Act', value: BillType[] }
export interface SelectBillTypesAction_out { type: 'SelectBillTypesAction_out_Act', value: string[] }
export interface ShowDialogAction_out { type: 'ShowDialogAction_out_Act', value: boolean }
export interface DialogTextAction_out { type: 'DialogTextAction_out_Act', value: string }

export type KnownAction = StartDateAction_out | EndDateAction_out | ColumnsDataAction_out | ColumnsAction_out | CurrentIndexAction_out | StepsAction_out | BillTypesAction_out | SelectBillTypesAction_out | ShowDialogAction_out | DialogTextAction_out;


export const actionCreators = {
    _startDate:(value: dayjs.Dayjs)=>({type: 'StartDateAction_out_Act',value:value} as StartDateAction_out),
    _endDate:(value: dayjs.Dayjs)=>({type: 'EndDateAction_out_Act',value:value} as EndDateAction_out),
    _columnsData:(value: _Row[])=>({type: 'ColumnsDataAction_out_Act',value:value} as ColumnsDataAction_out),
    _columns:(value: _Column[])=>({type: 'ColumnsAction_out_Act',value:value} as ColumnsAction_out),
    _currentIndex:(value: number)=>({type: 'CurrentIndexAction_out_Act',value:value} as CurrentIndexAction_out),
    _steps:(value: StepsType[])=>({type: 'StepsAction_out_Act',value:value} as StepsAction_out),
    _billType:(value: BillType[])=>({type: 'BillTypesAction_out_Act',value:value} as BillTypesAction_out),
    _selectBillType:(value: string[])=>({type: 'SelectBillTypesAction_out_Act',value:value} as SelectBillTypesAction_out),
    _showDialog:(value: boolean)=>({type: 'ShowDialogAction_out_Act',value:value} as ShowDialogAction_out),
    _dialogText:(value: string)=>({type: 'DialogTextAction_out_Act',value:value} as DialogTextAction_out),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        fetch(window.location.origin + "/" + `api/Billtype`, 
        { 
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body:JSON.stringify({TypeName:'out'}) ,
        })
                .then(response => response.json() as Promise<BillType[]>)
                .then(data => {
                    //let main: BillType[] = new Array<BillType>();
                    dispatch({ type: 'BillTypesAction_out_Act', value: data });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });
    },
}


export const reducer:Reducer<CPCKDState> = (state: CPCKDState | undefined, incomingAction: Action): CPCKDState => {
    if (state === undefined) {
        return { 
            startDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            endDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            columnsData:new Array<_Row>(),
            columns:new Array<_Column>(),
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
        case 'StartDateAction_out_Act':
            return { ...state, startDate: action.value };
        case 'EndDateAction_out_Act':
            return { ...state, endDate: action.value };
        case 'ColumnsDataAction_out_Act':
            return { ...state, columnsData: action.value };
        case 'ColumnsAction_out_Act':
            return { ...state, columns: action.value };
        case 'CurrentIndexAction_out_Act':
            return { ...state, currentindex: action.value };
        case 'StepsAction_out_Act':
            return { ...state, steps: action.value };
        case 'BillTypesAction_out_Act':
            return { ...state, billTypes: action.value };
        case 'SelectBillTypesAction_out_Act':
            return { ...state, selectBillTypes: action.value };
        case 'ShowDialogAction_out_Act':
            return { ...state, showDialog: action.value };
        case 'DialogTextAction_out_Act':
            return { ...state, dialogText: action.value };
        default:
            return state;
    }

}
