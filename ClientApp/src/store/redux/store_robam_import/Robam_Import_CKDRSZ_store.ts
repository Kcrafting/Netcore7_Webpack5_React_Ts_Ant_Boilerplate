import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../..';
import {BillType,_Row,_Column} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {TableProps_} from './Robam_Import_CPRKD_store'

export interface Settings_out{
    label:string,
    value:string
}
export interface CKDRSZState{
    enable:boolean,
    delay:Settings_out,
    delaydays:number,
    importTime:string,
    delaySettingsItems:Settings_out[],
    billTypes :BillType[],
    selectBillTypes:string[],
    rows?:_Row[] | undefined,
    columns?:_Column[] | undefined,
    showgrid?:boolean,
    isErrorFilter:string,
    descriptionFilter:string,
    timeFilter:string,
}

export interface EnableAction_out { type: 'EnableAction_out_Act', value: boolean }
export interface DelayAction_out { type: 'DelayAction_out_Act', value: Settings_out }
export interface DelayDaysAction_out { type: 'DelayDaysAction_out_Act', value: number }
export interface ImportTimeAction_out { type: 'ImportTimeAction_out_Act', value: string }
export interface DelaySettingsItemsAction_out { type: 'DelaySettingsItemsAction_out_Act', value: Settings_out[] }
export interface BillTypes_out { type: 'BillTypes_out_Act', value: BillType[] }
export interface SelectBillTypesAction_out { type: 'SelectBillTypesAction_out_Act', value: string[] }
export interface RowsAction_out { type: 'RowsAction_out_Act', value: _Row[] | undefined }
export interface ColumnsAction_out { type: 'ColumnsAction_out_Act', value: _Column[] | undefined }
export interface ShowGridAction_out { type: 'ShowGridAction_out_Act', value: boolean }
export interface IsErrorFilterAction_out { type: 'IsErrorFilterAction_out_Act', value: string }
export interface DescriptionFilterAction_out { type: 'DescriptionFilterAction_out_Act', value: string }
export interface TimeFilterAction_out { type: 'TimeFilterAction_out_Act', value: string }

export type KnownAction = EnableAction_out | DelayAction_out | DelayDaysAction_out | ImportTimeAction_out | DelaySettingsItemsAction_out | BillTypes_out | SelectBillTypesAction_out | 
RowsAction_out | ColumnsAction_out | ShowGridAction_out | IsErrorFilterAction_out | DescriptionFilterAction_out | TimeFilterAction_out;

export const actionCreators = {
    _enable:(value: boolean)=>({type: 'EnableAction_out_Act',value:value} as EnableAction_out),
    _delay:(value: Settings_out)=>({type: 'DelayAction_out_Act',value:value} as DelayAction_out),
    _delayday:(value: number)=>({type: 'DelayDaysAction_out_Act',value:value} as DelayDaysAction_out),
    _importtime:(value: string)=>({type: 'ImportTimeAction_out_Act',value:value} as ImportTimeAction_out),
    _delaySettingsItems:(value: Settings_out[])=>({type: 'DelaySettingsItemsAction_out_Act',value:value} as DelaySettingsItemsAction_out),
    _billTypes:(value: BillType[])=>({type: 'BillTypes_out_Act',value:value} as BillTypes_out),
    _selectBillTypes:(value: string[])=>({type: 'SelectBillTypesAction_out_Act',value:value} as SelectBillTypesAction_out),
    _rows:(value: _Row[] | undefined)=>({type: 'RowsAction_out_Act',value:value} as RowsAction_out),
    _columns:(value: _Column[] | undefined)=>({type: 'ColumnsAction_out_Act',value:value} as ColumnsAction_out),
    _showgrid:(value: boolean)=>({type: 'ShowGridAction_out_Act',value:value} as ShowGridAction_out),
    _isErrorFilter:(value: string)=>({type: 'IsErrorFilterAction_out_Act',value:value} as IsErrorFilterAction_out),
    _descriptionFilter:(value: string)=>({type: 'DescriptionFilterAction_out_Act',value:value} as DescriptionFilterAction_out),
    _timeFilter:(value: string)=>({type: 'TimeFilterAction_out_Act',value:value} as TimeFilterAction_out),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
                fetch(window.location.origin + "/" + `api/Settings`, { method: 'POST' })
                .then(response => response.json() as Promise<Settings_out[]>)
                .then(data => {
                    data.forEach((val, idx, arr) => {
          
                        if(val.label === "para_out_timingImport"){
                            dispatch({ type: 'EnableAction_out_Act', value: val.value as unknown as boolean });
                        }
                        if(val.label === "para_out_timingDelay"){
                            dispatch({ type: 'DelayAction_out_Act', value: val.value as unknown as Settings_out });
                        }
                        if(val.label === "para_out_timingDelayNumber"){
                            dispatch({ type: 'DelayDaysAction_out_Act', value: val.value as unknown as number });
                        }
                        if(val.label === "para_out_timingTime"){
                            dispatch({ type: 'ImportTimeAction_out_Act', value: val.value as unknown as string });
                        }
                        if(val.label === "para_out_billTypes"){
                            if(val.value == ''){
                                dispatch({ type: 'SelectBillTypesAction_out_Act', value: [] });
                            }else{
                                dispatch({ type: 'SelectBillTypesAction_out_Act', value: val.value.split(',') as string[] });
                            }
                        }
                    })
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
                    body:JSON.stringify({TypeName:'out'}) ,
                })
                .then(response => response.json() as Promise<BillType[]>)
                .then(data => {
                    //let main: BillType[] = new Array<BillType>();
                    dispatch({ type: 'BillTypes_out_Act', value: data });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });

                fetch(window.location.origin + "/" + `api/recordsyncautooutstock`, 
                { 
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                })
                .then(response => response.json() as Promise<TableProps_>)
                .then(data => {
                    //console.log('获得记录',dayjs(`${new Date()}`).format('YYYY/MM/DD HH:mm:ss').toString());
                    //let oobj = parse(JSON.stringify(data.columnType)) as _Column[];
                    console.log('data',data);
                    //console.log('data--->',JSON.stringify(data.columnType),'===>',data.columnType,'--->');
                    dispatch({ type: 'ColumnsAction_out_Act', value: data.columnType });
                    dispatch({ type: 'RowsAction_out_Act', value: data.rowData });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });
    },
}




export const reducer:Reducer<CKDRSZState> = (state: CKDRSZState | undefined, incomingAction: Action): CKDRSZState => {
    if (state === undefined) {
        return { 
            enable:false,
            delay:{label:"",value:""},
            delaydays:0,
            importTime:'00:00:00',
            delaySettingsItems:new Array<Settings_out>(),
            billTypes:[],
            selectBillTypes:[],
            rows:[],
            columns:[],
            showgrid:false,
            isErrorFilter:'all',
            descriptionFilter:'',
            timeFilter:'',
     };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'EnableAction_out_Act':
            return { ...state, enable: action.value };
        case 'DelayAction_out_Act':
            return { ...state, delay: action.value };
        case 'DelayDaysAction_out_Act':
            return { ...state, delaydays: action.value };
        case 'ImportTimeAction_out_Act':
            return { ...state, importTime: action.value };
        case 'DelaySettingsItemsAction_out_Act':
            return { ...state, delaySettingsItems: action.value };
        case 'BillTypes_out_Act':
            return { ...state, billTypes: action.value };
        case 'SelectBillTypesAction_out_Act':
            return { ...state, selectBillTypes: action.value };
        case 'RowsAction_out_Act':
            return { ...state, rows: action.value };
        case 'ColumnsAction_out_Act':
            return { ...state, columns: action.value };
        case 'ShowGridAction_out_Act':
            return { ...state, showgrid: action.value };
        case 'IsErrorFilterAction_out_Act':
            return { ...state, isErrorFilter: action.value };
        case 'DescriptionFilterAction_out_Act':
            return { ...state, descriptionFilter: action.value };
        case 'TimeFilterAction_out_Act':
            return { ...state, timeFilter: action.value };
        default:
            return state;
    }

}