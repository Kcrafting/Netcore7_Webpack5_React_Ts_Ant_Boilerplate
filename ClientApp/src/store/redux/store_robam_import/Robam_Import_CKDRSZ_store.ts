import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../..';


export interface Settings_out{
    label:string,
    value:string
}
export interface CKDRSZState{
    enable:boolean,
    delay:Settings_out,
    delaydays:number,
    importTime:string,
    delaySettingsItems:Settings_out[]
}

export interface EnableAction_out { type: 'EnableAction_out_Act', value: boolean }
export interface DelayAction_out { type: 'DelayAction_out_Act', value: Settings_out }
export interface DelayDaysAction_out { type: 'DelayDaysAction_out_Act', value: number }
export interface ImportTimeAction_out { type: 'ImportTimeAction_out_Act', value: string }
export interface DelaySettingsItemsAction_out { type: 'DelaySettingsItemsAction_out_Act', value: Settings_out[] }


export type KnownAction = EnableAction_out | DelayAction_out | DelayDaysAction_out | ImportTimeAction_out | DelaySettingsItemsAction_out;

export const actionCreators = {
    _enable:(value: boolean)=>({type: 'EnableAction_out_Act',value:value} as EnableAction_out),
    _delay:(value: Settings_out)=>({type: 'DelayAction_out_Act',value:value} as DelayAction_out),
    _delayday:(value: number)=>({type: 'DelayDaysAction_out_Act',value:value} as DelayDaysAction_out),
    _importtime:(value: string)=>({type: 'ImportTimeAction_out_Act',value:value} as ImportTimeAction_out),
    _delaySettingsItems:(value: Settings_out[])=>({type: 'DelaySettingsItemsAction_out_Act',value:value} as DelaySettingsItemsAction_out),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        fetch(window.location.origin + "/" + `api/Settings`, { method: 'POST' })
                .then(response => response.json() as Promise<Settings_out[]>)
                .then(data => {
                    let main: Settings_out[] = new Array<Settings_out>();
                    data.forEach((val, idx, arr) => {
                        console.log('val',val);
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
                    })
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
            delaySettingsItems:new Array<Settings_out>()
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
        default:
            return state;
    }

}