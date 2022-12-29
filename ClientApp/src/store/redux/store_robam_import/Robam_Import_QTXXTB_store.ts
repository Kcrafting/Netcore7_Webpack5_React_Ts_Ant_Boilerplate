import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {_Row,_Column,StepsType,BillType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'
import { AppThunkAction } from '../..';
import {TableProps_} from './Robam_Import_CPRKD_store'

export interface QTXXTBState{
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

export interface StartDateAction_sync { type: 'StartDateAction_sync_Act', value: dayjs.Dayjs }
export interface EndDateAction_sync { type: 'EndDateAction_sync_Act', value: dayjs.Dayjs }
export interface ColumnsDataAction_sync { type: 'ColumnsDataAction_sync_Act', value: _Row[] }
export interface ColumnsAction_sync { type: 'ColumnsAction_sync_Act', value: _Column[] }
export interface CurrentIndexAction_sync { type: 'CurrentIndexAction_sync_Act', value: number }
export interface StepsAction_sync { type: 'StepsAction_sync_Act', value: StepsType[] }
export interface BillTypesAction_sync { type: 'BillTypesAction_sync_Act', value: BillType[] }
export interface SelectBillTypesAction_sync { type: 'SelectBillTypesAction_sync_Act', value: string[] }
export interface ShowDialogAction_sync { type: 'ShowDialogAction_sync_Act', value: boolean }
export interface DialogTextAction_sync { type: 'DialogTextAction_sync_Act', value: string }

export type KnownAction = StartDateAction_sync | EndDateAction_sync | ColumnsDataAction_sync | ColumnsAction_sync | CurrentIndexAction_sync | StepsAction_sync | BillTypesAction_sync | SelectBillTypesAction_sync | ShowDialogAction_sync | DialogTextAction_sync;


export const actionCreators = {
    _startDate:(value: dayjs.Dayjs)=>({type: 'StartDateAction_sync_Act',value:value} as StartDateAction_sync),
    _endDate:(value: dayjs.Dayjs)=>({type: 'EndDateAction_sync_Act',value:value} as EndDateAction_sync),
    _columnsData:(value: _Row[])=>({type: 'ColumnsDataAction_sync_Act',value:value} as ColumnsDataAction_sync),
    _columns:(value: _Column[])=>({type: 'ColumnsAction_sync_Act',value:value} as ColumnsAction_sync),
    _currentIndex:(value: number)=>({type: 'CurrentIndexAction_sync_Act',value:value} as CurrentIndexAction_sync),
    _steps:(value: StepsType[])=>({type: 'StepsAction_sync_Act',value:value} as StepsAction_sync),
    _billType:(value: BillType[])=>({type: 'BillTypesAction_sync_Act',value:value} as BillTypesAction_sync),
    _selectBillType:(value: string[])=>({type: 'SelectBillTypesAction_sync_Act',value:value} as SelectBillTypesAction_sync),
    _showDialog:(value: boolean)=>({type: 'ShowDialogAction_sync_Act',value:value} as ShowDialogAction_sync),
    _dialogText:(value: string)=>({type: 'DialogTextAction_sync_Act',value:value} as DialogTextAction_sync),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
                fetch(window.location.origin + "/" + `api/Billtype`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body:JSON.stringify({TypeName:'sync'}) ,
                })
                .then(response => response.json() as Promise<BillType[]>)
                .then(data => {
                    //let main: BillType[] = new Array<BillType>();
                    dispatch({ type: 'BillTypesAction_sync_Act', value: data });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });

                fetch(window.location.origin + "/" + `api/recordsyncoutstock`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(response => response.json() as Promise<TableProps_>)
                .then(data => {
                    //let oobj = parse(JSON.stringify(data.columnType)) as _Column[];
                    console.log('data',data);
                    //console.log('data--->',JSON.stringify(data.columnType),'===>',data.columnType,'--->');
                    dispatch({ type: 'ColumnsAction_sync_Act', value: data.columnType });
                    dispatch({ type: 'ColumnsDataAction_sync_Act', value: data.rowData });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });
    },
}


export const reducer:Reducer<QTXXTBState> = (state: QTXXTBState | undefined, incomingAction: Action): QTXXTBState => {
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
        case 'StartDateAction_sync_Act':
            return { ...state, startDate: action.value };
        case 'EndDateAction_sync_Act':
            return { ...state, endDate: action.value };
        case 'ColumnsDataAction_sync_Act':
            return { ...state, columnsData: action.value };
        case 'ColumnsAction_sync_Act':
            return { ...state, columns: action.value };
        case 'CurrentIndexAction_sync_Act':
            return { ...state, currentindex: action.value };
        case 'StepsAction_sync_Act':
            return { ...state, steps: action.value };
        case 'BillTypesAction_sync_Act':
            return { ...state, billTypes: action.value };
        case 'SelectBillTypesAction_sync_Act':
            return { ...state, selectBillTypes: action.value };
        case 'ShowDialogAction_sync_Act':
            return { ...state, showDialog: action.value };
        case 'DialogTextAction_sync_Act':
            return { ...state, dialogText: action.value };
        default:
            return state;
    }

}
