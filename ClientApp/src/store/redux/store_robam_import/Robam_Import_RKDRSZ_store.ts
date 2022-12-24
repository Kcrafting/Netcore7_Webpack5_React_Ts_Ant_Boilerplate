import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../..';


export interface Settings{
    label:string,
    value:string
}
export interface RKDRSZState{
    enable:boolean,
    delay:Settings,
    delaydays:number,
    importTime:string,
    delaySettingsItems:Settings[]
}

export interface EnableAction { type: 'EnableAction_Act', value: boolean }
export interface DelayAction { type: 'DelayAction_Act', value: Settings }
export interface DelayDaysAction { type: 'DelayDaysAction_Act', value: number }
export interface ImportTimeAction { type: 'ImportTimeAction_Act', value: string }
export interface DelaySettingsItemsAction { type: 'DelaySettingsItemsAction_Act', value: Settings[] }


export type KnownAction = EnableAction | DelayAction | DelayDaysAction | ImportTimeAction | DelaySettingsItemsAction;

export const actionCreators = {
    _enable:(value: boolean)=>({type: 'EnableAction_Act',value:value} as EnableAction),
    _delay:(value: Settings)=>({type: 'DelayAction_Act',value:value} as DelayAction),
    _delayday:(value: number)=>({type: 'DelayDaysAction_Act',value:value} as DelayDaysAction),
    _importtime:(value: string)=>({type: 'ImportTimeAction_Act',value:value} as ImportTimeAction),
    _delaySettingsItems:(value: Settings[])=>({type: 'DelaySettingsItemsAction_Act',value:value} as DelaySettingsItemsAction),
    _init:():AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        fetch(window.location.origin + "/" + `api/Settings`, { method: 'POST' })
                .then(response => response.json() as Promise<Settings[]>)
                .then(data => {
                    let main: Settings[] = new Array<Settings>();
                    data.forEach((val, idx, arr) => {
                        console.log('val',val);
                        if(val.label === "para_in_timingImport"){
                            dispatch({ type: 'EnableAction_Act', value: val.value as unknown as boolean });
                        }
                        if(val.label === "para_in_timingDelay"){
                            dispatch({ type: 'DelayAction_Act', value: val.value as unknown as Settings });
                        }
                        if(val.label === "para_in_timingDelayNumber"){
                            dispatch({ type: 'DelayDaysAction_Act', value: val.value as unknown as number });
                        }
                        if(val.label === "para_in_timingTime"){
                            dispatch({ type: 'ImportTimeAction_Act', value: val.value as unknown as string });
                        }
                    })
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
            delaySettingsItems:new Array<Settings>()
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
        default:
            return state;
    }

}