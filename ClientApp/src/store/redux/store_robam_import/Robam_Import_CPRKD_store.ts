import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {_Row,_Column,StepsType,BillType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'
import { AppThunkAction } from '../..';
import React,{ useContext } from 'react';

//-import type {  HeaderRendererProps }  from '../../../components/components_robam_import/types'


export interface CPRKDState{
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
    isErrorFilter:string,
    descriptionFilter:string,
    timeFilter:string,
}

export interface TableProps_{
    columnType:_Column[],
    rowData:_Row[]
}

export interface Filter{

}



export interface StartDateAction { type: 'StartDateAction_Act', value: dayjs.Dayjs }
export interface EndDateAction { type: 'EndDateAction_Act', value: dayjs.Dayjs }
export interface ColumnsDataAction { type: 'ColumnsDataAction_Act', value: _Row[] }
export interface ColumnsAction { type: 'ColumnsAction_Act', value: _Column[] }
export interface CurrentIndexAction { type: 'CurrentIndexAction_Act', value: number }
export interface StepsAction { type: 'StepsAction_Act', value: StepsType[] }
export interface BillTypesAction { type: 'BillTypesAction_Act', value: BillType[] }
export interface SelectBillTypesAction { type: 'SelectBillTypesAction_Act', value: string[] }
export interface ShowDialogAction { type: 'ShowDialogAction_Act', value: boolean }
export interface DialogTextAction { type: 'DialogTextAction_Act', value: string }
export interface IsErrorFilterAction { type: 'IsErrorFilterAction_Act', value: string }
export interface DescriptionFilterAction { type: 'DescriptionFilterAction_Act', value: string }
export interface TimeFilterAction { type: 'TimeFilterAction_Act', value: string }

export type KnownAction = StartDateAction | EndDateAction | ColumnsDataAction | ColumnsAction | CurrentIndexAction | StepsAction | BillTypesAction | SelectBillTypesAction | ShowDialogAction | DialogTextAction | 
IsErrorFilterAction | DescriptionFilterAction | TimeFilterAction;

export const actionCreators = {
    _startDate:(value: dayjs.Dayjs)=>({type: 'StartDateAction_Act',value:value} as StartDateAction),
    _endDate:(value: dayjs.Dayjs)=>({type: 'EndDateAction_Act',value:value} as EndDateAction),
    _columnsData:(value: _Row[])=>({type: 'ColumnsDataAction_Act',value:value} as ColumnsDataAction),
    _columns:(value: _Column[])=>({type: 'ColumnsAction_Act',value:value} as ColumnsAction),
    _currentIndex:(value: number)=>({type: 'CurrentIndexAction_Act',value:value} as CurrentIndexAction),
    _steps:(value: StepsType[])=>({type: 'StepsAction_Act',value:value} as StepsAction),
    _billType:(value: BillType[])=>({type: 'BillTypesAction_Act',value:value} as BillTypesAction),
    _selectBillType:(value: string[])=>({type: 'SelectBillTypesAction_Act',value:value} as SelectBillTypesAction),
    _showDialog:(value: boolean)=>({type: 'ShowDialogAction_Act',value:value} as ShowDialogAction),
    _dialogText:(value: string)=>({type: 'DialogTextAction_Act',value:value} as DialogTextAction),
    _isErrorFilter:(value: string)=>({type: 'IsErrorFilterAction_Act',value:value} as IsErrorFilterAction),
    _descriptionFilter:(value: string)=>({type: 'DescriptionFilterAction_Act',value:value} as DescriptionFilterAction),
    _timeFilter:(value: string)=>({type: 'TimeFilterAction_Act',value:value} as TimeFilterAction),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
                console.log('获取记录',dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss').toString());
                fetch(window.location.origin + "/" + `api/recordsyncinstock`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(response => response.json() as Promise<TableProps_>)
                .then(data => {
                    console.log('获得记录',dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss').toString());
                    //let oobj = parse(JSON.stringify(data.columnType)) as _Column[];
                    //console.log('data',data);
                    //console.log('data--->',JSON.stringify(data.columnType),'===>',data.columnType,'--->');
                    dispatch({ type: 'ColumnsAction_Act', value: data.columnType });
                    dispatch({ type: 'ColumnsDataAction_Act', value: data.rowData });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });

                fetch(window.location.origin + "/" + `api/Billtype`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body:JSON.stringify({TypeName:'in'}) ,
                })
                .then(response => response.json() as Promise<BillType[]>)
                .then(data => {
                    //let main: BillType[] = new Array<BillType>();
                    dispatch({ type: 'BillTypesAction_Act', value: data });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });

                
    },
}


export const reducer:Reducer<CPRKDState> = (state: CPRKDState | undefined, incomingAction: Action): CPRKDState => {
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
            dialogText:'',
            isErrorFilter:'all',
            descriptionFilter:'',
            timeFilter:''
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
        case 'IsErrorFilterAction_Act':
            return { ...state, isErrorFilter: action.value };
        case 'DescriptionFilterAction_Act':
            return { ...state, descriptionFilter: action.value };
        case 'TimeFilterAction_Act':
            return { ...state, timeFilter: action.value };
        default:
            return state;
    }

}
