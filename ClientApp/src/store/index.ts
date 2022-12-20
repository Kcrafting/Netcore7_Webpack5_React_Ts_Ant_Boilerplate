import * as MenuState from './redux/store_robam_import/Robam_Menu_store'
import * as CPRKDState from './redux/store_robam_import/Robam_Import_CPRKD_store'

export interface ApplicationState {
    menu:MenuState.MenuState | undefined,
    cprkd:CPRKDState.CPRKDState | undefined,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    menu:MenuState.reducer,
    cprkd:CPRKDState.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}