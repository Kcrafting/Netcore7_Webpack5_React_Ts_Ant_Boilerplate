import React from 'react';
import { Action, Reducer } from 'redux';
import { MenuProps } from 'antd';
import { AppThunkAction } from '../..';
import * as icons from '@ant-design/icons';


const antIcon: { [key: string]: any } = icons;

// const Icon = (props: { icon: string }) => {
//     const { icon } = props;
//     const antIcon: { [key: string]: any } = icons;
//     return React.createElement(antIcon[icon]);
// };

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
type MenuItem = Required<MenuProps>['items'][number];

export interface MenuState {
    collapsed: boolean | undefined;
    paused: boolean;
    menuWidth: number;
    menuList?: MenuItem[] | undefined;
    menuListIsLoading: boolean;
}

export interface _MenuItem {
    label: React.ReactNode,
    key: React.Key,
    icon: React.ReactNode,
    type: string,
    children: _MenuItem[],
    url: string,
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface CollapsedAction { type: 'CollapsedAction_Act', value: boolean | undefined }
export interface PausedAction { type: 'PausedAction_Act', value: boolean }
export interface MenuWidthAction { type: 'MenuWidthAction_Act', value: number }
export interface MenuListAction { type: 'MenuListAction_Act', value: _MenuItem[] | undefined }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = CollapsedAction | PausedAction | MenuWidthAction | MenuListAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

const GetMenuItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',): _MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as _MenuItem;
}

const RecursionMenu = (_menuItem: _MenuItem): MenuItem => {
    let menus: _MenuItem = GetMenuItem(_menuItem.label, _menuItem.key, (_menuItem.icon != null && typeof _menuItem.icon != undefined && _menuItem.icon != '' ? React.createElement(antIcon[_menuItem.icon as string]) : null));
    if (_menuItem.children != null && typeof _menuItem.children != undefined) {
        //let arr:_MenuItem[] = new Array<_MenuItem>();
        menus.children = new Array<_MenuItem>();
        _menuItem.children.forEach((val, index, arr) => {

            menus.children.push(RecursionMenu(val) as _MenuItem);
        });
        //menus.children = arr;
    }
    return menus;
}

export const actionCreators = {
    _collapsed: () => ({ type: 'CollapsedAction_Act' } as CollapsedAction),
    _paused: () => ({ type: 'PausedAction_Act' } as PausedAction),
    _menuWidth: () => ({ type: 'MenuWidthAction_Act' } as MenuWidthAction),
    _menuList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        const appState = getState();
        console.log('_menuList exceuted', appState)
        if (appState) {
            fetch(`api/Menu`, { method: 'POST' })
                .then(response => response.json() as Promise<_MenuItem[]>)
                .then(data => {
                    let main: MenuItem[] = new Array<MenuItem>();
                    data.forEach((val, idx, arr) => {
                        main.push(RecursionMenu(val));
                    })
                    dispatch({ type: 'MenuListAction_Act', value: main as _MenuItem[] });
                })
                .catch(err => {
                    dispatch({ type: 'MenuListAction_Act', value: undefined });
                });
            dispatch({ type: 'MenuListAction_Act', value: undefined });
        }
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<MenuState> = (state: MenuState | undefined, incomingAction: Action): MenuState => {
    if (state === undefined) {
        return { collapsed: false, paused: true, menuWidth: 240, menuListIsLoading: false, menuList: undefined };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'CollapsedAction_Act':
            return { ...state, collapsed: action.value };
        case 'PausedAction_Act':
            return { ...state, paused: action.value };
        case 'MenuWidthAction_Act':
            return { ...state, menuWidth: action.value };
        case 'MenuListAction_Act':
            return { ...state, menuList: action.value };
        default:
            return state;
    }
};
