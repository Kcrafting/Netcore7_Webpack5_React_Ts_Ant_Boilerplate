import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {_Row,_Column,StepsType,BillType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'
import { AppThunkAction } from '../..';
import {TableProps_} from './Robam_Import_CPRKD_store'

export interface JCZLDRState{
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

export interface StartDateAction_base { type: 'StartDateAction_base_Act', value: dayjs.Dayjs }
export interface EndDateAction_base { type: 'EndDateAction_base_Act', value: dayjs.Dayjs }
export interface ColumnsDataAction_base { type: 'ColumnsDataAction_base_Act', value: _Row[] }
export interface ColumnsAction_base { type: 'ColumnsAction_base_Act', value: _Column[] }
export interface CurrentIndexAction_base { type: 'CurrentIndexAction_base_Act', value: number }
export interface StepsAction_base { type: 'StepsAction_base_Act', value: StepsType[] }
export interface BillTypesAction_base { type: 'BillTypesAction_base_Act', value: BillType[] }
export interface SelectBillTypesAction_base { type: 'SelectBillTypesAction_base_Act', value: string[] }
export interface ShowDialogAction_base { type: 'ShowDialogAction_base_Act', value: boolean }
export interface DialogTextAction_base { type: 'DialogTextAction_base_Act', value: string }

export type KnownAction = StartDateAction_base | EndDateAction_base | ColumnsDataAction_base | ColumnsAction_base | CurrentIndexAction_base | StepsAction_base | BillTypesAction_base | SelectBillTypesAction_base | ShowDialogAction_base | DialogTextAction_base;


export const actionCreators = {
    _startDate:(value: dayjs.Dayjs)=>({type: 'StartDateAction_base_Act',value:value} as StartDateAction_base),
    _endDate:(value: dayjs.Dayjs)=>({type: 'EndDateAction_base_Act',value:value} as EndDateAction_base),
    _columnsData:(value: _Row[])=>({type: 'ColumnsDataAction_base_Act',value:value} as ColumnsDataAction_base),
    _columns:(value: _Column[])=>({type: 'ColumnsAction_base_Act',value:value} as ColumnsAction_base),
    _currentIndex:(value: number)=>({type: 'CurrentIndexAction_base_Act',value:value} as CurrentIndexAction_base),
    _steps:(value: StepsType[])=>({type: 'StepsAction_base_Act',value:value} as StepsAction_base),
    _billType:(value: BillType[])=>({type: 'BillTypesAction_base_Act',value:value} as BillTypesAction_base),
    _selectBillType:(value: string[])=>({type: 'SelectBillTypesAction_base_Act',value:value} as SelectBillTypesAction_base),
    _showDialog:(value: boolean)=>({type: 'ShowDialogAction_base_Act',value:value} as ShowDialogAction_base),
    _dialogText:(value: string)=>({type: 'DialogTextAction_base_Act',value:value} as DialogTextAction_base),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
                fetch(window.location.origin + "/" + `api/Billtype`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body:JSON.stringify({TypeName:'base'}) ,
                })
                .then(response => response.json() as Promise<BillType[]>)
                .then(data => {
                    //let main: BillType[] = new Array<BillType>();
                    dispatch({ type: 'BillTypesAction_base_Act', value: data });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });


                fetch(window.location.origin + "/" + `api/recordsyncjczldr`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(response => response.json() as Promise<TableProps_>)
                .then(data => {

                    dispatch({ type: 'ColumnsAction_base_Act', value: data.columnType });
                    dispatch({ type: 'ColumnsDataAction_base_Act', value: data.rowData });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });
    },
}


export const reducer:Reducer<JCZLDRState> = (state: JCZLDRState | undefined, incomingAction: Action): JCZLDRState => {
    if (state === undefined) {
        return { 
            startDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            endDate:dayjs(dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss'), 'YYYY/MM/DD HH:mm:ss'),
            columnsData:new Array<_Row>(),
            columns:new Array<_Column>(),
            currentindex:2,
            steps:new Array<StepsType>(),
            billTypes:new Array<BillType>(),
            selectBillTypes:new Array<string>(),
            showDialog:false,
            dialogText:''
     };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'StartDateAction_base_Act':
            return { ...state, startDate: action.value };
        case 'EndDateAction_base_Act':
            return { ...state, endDate: action.value };
        case 'ColumnsDataAction_base_Act':
            return { ...state, columnsData: action.value };
        case 'ColumnsAction_base_Act':
            return { ...state, columns: action.value };
        case 'CurrentIndexAction_base_Act':
            return { ...state, currentindex: action.value };
        case 'StepsAction_base_Act':
            return { ...state, steps: action.value };
        case 'BillTypesAction_base_Act':
            return { ...state, billTypes: action.value };
        case 'SelectBillTypesAction_base_Act':
            return { ...state, selectBillTypes: action.value };
        case 'ShowDialogAction_base_Act':
            return { ...state, showDialog: action.value };
        case 'DialogTextAction_base_Act':
            return { ...state, dialogText: action.value };
        default:
            return state;
    }

}
