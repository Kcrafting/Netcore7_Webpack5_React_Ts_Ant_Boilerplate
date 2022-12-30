import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../..';
import {BillType,_Row,_Column} from '../../../components/components_robam_import/Robam_Import_CPRKD'
import {TableProps_} from './Robam_Import_CPRKD_store'
export interface Settings{
    label:string,
    value:string
}
export interface RKDRSZState{
    enable:boolean,
    delay:Settings,
    delaydays:number,
    importTime:string,
    delaySettingsItems:Settings[],
    billTypes :BillType[],
    selectBillTypes:string[],
    rows?:_Row[] | undefined,
    columns?:_Column[] | undefined,
    showgrid?:boolean,
    isErrorFilter:string,
    descriptionFilter:string,
    timeFilter:string,
}

export interface EnableAction { type: 'EnableAction_Act', value: boolean }
export interface DelayAction { type: 'DelayAction_Act', value: Settings }
export interface DelayDaysAction { type: 'DelayDaysAction_Act', value: number }
export interface ImportTimeAction { type: 'ImportTimeAction_Act', value: string }
export interface DelaySettingsItemsAction { type: 'DelaySettingsItemsAction_Act', value: Settings[] }
export interface BillTypesAction { type: 'BillTypesAction_Act', value: BillType[] }
export interface SelectBillTypesAction { type: 'SelectBillTypesAction_Act', value: string[] }
export interface RowsAction { type: 'RowsAction_Act', value: _Row[] | undefined }
export interface ColumnsAction { type: 'ColumnsAction_Act', value: _Column[] | undefined }
export interface ShowGridAction { type: 'ShowGridAction_Act', value: boolean }
export interface IsErrorFilterAction { type: 'IsErrorFilterAction_Act', value: string }
export interface DescriptionFilterAction { type: 'DescriptionFilterAction_Act', value: string }
export interface TimeFilterAction { type: 'TimeFilterAction_Act', value: string }

export type KnownAction = EnableAction | DelayAction | DelayDaysAction | ImportTimeAction | DelaySettingsItemsAction | BillTypesAction | SelectBillTypesAction | 
RowsAction | ColumnsAction | ShowGridAction | IsErrorFilterAction | DescriptionFilterAction | TimeFilterAction;

export const actionCreators = {
    _enable:(value: boolean)=>({type: 'EnableAction_Act',value:value} as EnableAction),
    _delay:(value: Settings)=>({type: 'DelayAction_Act',value:value} as DelayAction),
    _delayday:(value: number)=>({type: 'DelayDaysAction_Act',value:value} as DelayDaysAction),
    _importtime:(value: string)=>({type: 'ImportTimeAction_Act',value:value} as ImportTimeAction),
    _delaySettingsItems:(value: Settings[])=>({type: 'DelaySettingsItemsAction_Act',value:value} as DelaySettingsItemsAction),
    _billTypes:(value: BillType[])=>({type: 'BillTypesAction_Act',value:value} as BillTypesAction),
    _selectBillTypes:(value: string[])=>({type: 'SelectBillTypesAction_Act',value:value} as SelectBillTypesAction),
    _rows:(value: _Row[] | undefined)=>({type: 'RowsAction_Act',value:value} as RowsAction),
    _columns:(value: _Column[] | undefined)=>({type: 'ColumnsAction_Act',value:value} as ColumnsAction),
    _showgrid:(value: boolean)=>({type: 'ShowGridAction_Act',value:value} as ShowGridAction),
    _isErrorFilter:(value: string)=>({type: 'IsErrorFilterAction_Act',value:value} as IsErrorFilterAction),
    _descriptionFilter:(value: string)=>({type: 'DescriptionFilterAction_Act',value:value} as DescriptionFilterAction),
    _timeFilter:(value: string)=>({type: 'TimeFilterAction_Act',value:value} as TimeFilterAction),
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

                fetch(window.location.origin + "/" + `api/Settings`, { method: 'POST' })
                .then(response => response.json() as Promise<Settings[]>)
                .then(data => {
                    data.forEach((val, idx, arr) => {
                        if(val.label == "para_in_timingImport"){
                            dispatch({ type: 'EnableAction_Act', value: val.value as unknown as boolean });
                        }
                        if(val.label == "para_in_timingDelay"){
                            dispatch({ type: 'DelayAction_Act', value: val.value as unknown as Settings });
                        }
                        if(val.label == "para_in_timingDelayNumber"){
                            dispatch({ type: 'DelayDaysAction_Act', value: val.value as unknown as number });
                        }
                        if(val.label == "para_in_timingTime"){
                            dispatch({ type: 'ImportTimeAction_Act', value: val.value as unknown as string });
                        }
                        if(val.label == "para_in_billTypes"){
                            if(val.value == ''){
                                dispatch({ type: 'SelectBillTypesAction_Act', value: [] });
                            }else{
                                dispatch({ type: 'SelectBillTypesAction_Act', value: val.value.split(',') as string[] });
                            }
                        }
                    })
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
                    dispatch({ type: 'ColumnsAction_Act', value: data.columnType });
                    dispatch({ type: 'RowsAction_Act', value: data.rowData });
                    //dispatch({ type: 'MenuListAction_Act', value: main as Settings[] });
                })
                .catch(err => {
                    //dispatch({ type: 'MenuListAction_Act', value: undefined });
                });

               
    },
}




export const reducer:Reducer<RKDRSZState> = (state: RKDRSZState | undefined, incomingAction: Action): RKDRSZState => {
    if (state === undefined) {
        return { 
            enable:false,
            delay:{label:"",value:""},
            delaydays:0,
            importTime:'00:00:00',
            delaySettingsItems:new Array<Settings>(),
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
        case 'EnableAction_Act':
            return { ...state, enable: action.value };
        case 'DelayAction_Act':
            return { ...state, delay: action.value };
        case 'DelayDaysAction_Act':
            return { ...state, delaydays: action.value };
        case 'ImportTimeAction_Act':
            return { ...state, importTime: action.value };
        case 'DelaySettingsItemsAction_Act':
            return { ...state, delaySettingsItems: action.value };
        case 'BillTypesAction_Act':
            {
                return { ...state, billTypes: action.value };
            }
            
        case 'SelectBillTypesAction_Act':
            {
                return { ...state, selectBillTypes: action.value };
            }
        case 'RowsAction_Act':
            return { ...state, rows: action.value };
        case 'ColumnsAction_Act':
            return { ...state, columns: action.value };
        case 'ShowGridAction_Act':
            return { ...state, showgrid: action.value };
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