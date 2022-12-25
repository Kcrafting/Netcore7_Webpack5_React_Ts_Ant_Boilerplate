import { Action, Reducer } from 'redux';
import dayjs from 'dayjs';
import {_Row,_Column,StepsType,BillType} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {Column} from 'react-data-grid'
import { useDispatch } from 'react-redux'
import { AppThunkAction } from '../..';
import React,{ useContext } from 'react';
import { Checkbox } from 'antd';
//-import type {  HeaderRendererProps }  from '../../../components/components_robam_import/types'
import {useFocusRef} from 'react-data-grid'
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
    
}

export interface TableProps_{
    columnType:_Column[],
    rowData:_Row[]
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

export type KnownAction = StartDateAction | EndDateAction | ColumnsDataAction | ColumnsAction | CurrentIndexAction | StepsAction | BillTypesAction | SelectBillTypesAction | ShowDialogAction | DialogTextAction;



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
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
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

                fetch(window.location.origin + "/" + `api/Robam_Api`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(response => response.json() as Promise<TableProps_>)
                .then(data => {
                    console.log('data',data.rowData);
                    //let main: BillType[] = new Array<BillType>();
                    let columnData = data.columnType.map((val,index,arr)=>{
                        if(val.key === 'isError'){
                            val.headerCellClass="filter-cell";
                            val.formatter = (row) =>{
                                return (
                                  <Checkbox checked={row.row.isError}/>
                                );
                              };
                            val.headerRenderer = (row)=>{
                                  return (<div style={{display:'flex',flexDirection:'column',blockSize:'100%',height:'90px'}}> 
                                      <div style={{height:'45px',maxHeight:'45px',flex:1,lineHeight:'45px',width:'100%',borderBlockEnd:'1px solid'}}>
                                      <span><b>{row.column.name}</b></span>
                                      </div>
                                      <div style={{height:'45px',maxHeight:'45px',flex:1,lineHeight:'45px'}}>
                                      <input style={{height:'35px',flex:1,width:'100%'}}/>
                                      </div>
                                  </div>)
                              }
                        }
                        if(val.key === 'errrorTime'){
                            val.headerCellClass="filter-cell";
                            val.headerRenderer = (row)=>{
                                return (<div style={{display:'flex',flexDirection:'column',blockSize:'100%',height:'90px',padding:'0px',margin:'0px',paddingInline:'-8px'}}> 
                                    <div style={{height:'45px',maxHeight:'45px',flex:1,lineHeight:'45px',width:'100%',textAlign:'center',display:'block',borderBlockEnd:'1px solid'}}>
                                    <span ><b>{row.column.name}</b></span>
                                    </div>
                                    <div style={{height:'45px',maxHeight:'45px',flex:1,lineHeight:'45px',display:'block'//,borderInlineEnd:'1px solid',borderBlockEnd:'1px solid',
                                }}>
                                    <input style={{height:'35px',flex:1,width:'100%'}}/>
                                    </div>
                                </div>)
                            }
                        }
                        if(val.key === 'description'){
                            val.headerCellClass="filter-cell";
                            val.headerRenderer = (row)=>{
                                return (<div style={{display:'flex',flexDirection:'column',blockSize:'100%',height:'90px'}}> 
                                    <div style={{height:'45px',maxHeight:'45px',flex:1,lineHeight:'45px',width:'100%',borderBlockEnd:'1px solid'}}>
                                    <span><b>{row.column.name}</b></span>
                                    </div>
                                    <div style={{height:'45px',maxHeight:'45px',flex:1,lineHeight:'45px'}}>
                                    <input style={{height:'35px',flex:1,width:'100%'}}/>
                                    </div>
                                </div>)
                            }
                        }
                    })
                    dispatch({ type: 'ColumnsAction_Act', value: data.columnType });
                    dispatch({ type: 'ColumnsDataAction_Act', value: data.rowData });
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
