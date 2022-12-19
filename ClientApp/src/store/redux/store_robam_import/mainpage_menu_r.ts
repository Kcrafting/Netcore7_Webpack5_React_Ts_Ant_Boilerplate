import { Action, Reducer } from 'redux';
import { MenuProps } from 'antd';
import { AppThunkAction } from '../../';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
type MenuItem = Required<MenuProps>['items'][number];

export interface mainpageMenuState {
    collapsed: boolean|undefined;
    paused:boolean;
    menuWidth:number;
    menuList:menu_Item[];
    menuListIsLoading:boolean;
}

export interface menu_Item{
    label:string,
    key:string,
    icon:string,
    type:string,
    children:Array<menu_Item>|undefined
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface CollapsedAction { type: 'CollapsedAction_Act',value:boolean|undefined }
export interface PausedAction { type: 'PausedAction_Act',value:boolean }
export interface MenuWidthAction { type: 'MenuWidthAction_Act',value:number }
export interface MenuListAction { type: 'MenuListAction_Act',value:menu_Item[] }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = CollapsedAction | PausedAction | MenuWidthAction | MenuListAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

function GetMenuItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',  ): MenuItem 
{
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
}

export const actionCreators = {
    _collapsed: () => ({ type: 'CollapsedAction_Act' } as CollapsedAction),
    _paused: () => ({ type: 'PausedAction_Act' } as PausedAction),
    _menuWidth: () => ({ type: 'MenuWidthAction_Act' } as MenuWidthAction),
    _menuList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        console.log('_menuList exceuted')
        const appState = getState();
        if (appState) {
            fetch(`/api/Menu`,{method:'POST'})
                .then(response => response.json() as Promise<menu_Item[]>)
                .then(data => {
                    console.log('data',data)
                    // let menu:MenuItem = GetMenuItem();
                    // data.map(()=>{
                    //     menu.
                    // })
                    dispatch({ type: 'MenuListAction_Act', value:data });
                });

            //dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<mainpageMenuState> = (state: mainpageMenuState | undefined, incomingAction: Action): mainpageMenuState => {
    if (state === undefined) {
        return { collapsed: false,paused:true, menuWidth:240,menuList:[{label:'',key:'',icon:'',type:'',children:undefined}],menuListIsLoading:false};
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'CollapsedAction_Act':
            return { ...state,collapsed: action.value };
        case 'PausedAction_Act':
            return { ...state,paused: action.value };
        case 'MenuWidthAction_Act':
            return { ...state,menuWidth: action.value };
        default:
            return state;
    }
};
