import * as MenuState from './redux/store_robam_import/Robam_Menu_store'
import * as CPRKDState from './redux/store_robam_import/Robam_Import_CPRKD_store'
import * as RKDRSZState from './redux/store_robam_import/Robam_Import_RKDRSZ_store'
import * as CKDRSZState from './redux/store_robam_import/Robam_Import_CKDRSZ_store'
import * as CPCKDState from './redux/store_robam_import/Robam_Import_CPCKD_store'
import * as JCZLDRState from './redux/store_robam_import/Robam_Import_JCZLDR_store'
import * as QTXXTBState from './redux/store_robam_import/Robam_Import_QTXXTB_store'
export interface ApplicationState {
    menu:MenuState.MenuState | undefined,
    cprkd:CPRKDState.CPRKDState | undefined,
    rkdsz:RKDRSZState.RKDRSZState | undefined,
    ckdsz:CKDRSZState.CKDRSZState | undefined,
    cpckd:CPCKDState.CPCKDState | undefined,
    jczldr:JCZLDRState.JCZLDRState | undefined,
    qtxxtb:QTXXTBState.QTXXTBState | undefined,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    menu:MenuState.reducer,
    cprkd:CPRKDState.reducer,
    rkdsz:RKDRSZState.reducer,
    ckdsz:CKDRSZState.reducer,
    cpckd:CPCKDState.reducer,
    jczldr:JCZLDRState.reducer,
    qtxxtb:QTXXTBState.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}