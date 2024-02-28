import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SagaActionTypes {
  GetBackup = 'chat/get-backup',
  GenerateBackup = 'chat/generate-backup',
  SaveBackup = 'chat/save-backup',
  RestoreBackup = 'chat/restore-backup',
  ClearBackup = 'chat/clear-backup',
  DebugDeviceList = 'chat/debug-device-list',
  DebugRoomKeys = 'chat/debug-room-keys',
  FetchDeviceInfo = 'chat/fetch-device-info',
  ResendKeyRequests = 'chat/resend-key-requests',
  DiscardOlm = 'chat/discard-olm',
  RestartOlm = 'chat/restart-olm',
  ShareHistoryKeys = 'chat/share-history-keys',
  OpenBackupDialog = 'chat/open-backup-dialog',
  CloseBackupDialog = 'chat/close-backup-dialog',
  VerifyKey = 'chat/verify-key',
}

export enum BackupStage {
  None = 'none',
  SystemPrompt = 'system_prompt',
  VerifyKeyPhrase = 'verify_key_phrase',
  GenerateBackup = 'generate_backup',
  RestoreBackup = 'restore_backup',
  Success = 'success',
}

export type MatrixState = {
  isLoaded: boolean;
  trustInfo: { trustedLocally: boolean; usable: boolean; isLegacy: boolean } | null;
  generatedRecoveryKey: string | null;
  successMessage: string;
  errorMessage: string;
  deviceId: string;
  isBackupDialogOpen: boolean;
  backupStage: BackupStage;
};

export const initialState: MatrixState = {
  isLoaded: false,
  trustInfo: null,
  generatedRecoveryKey: null,
  successMessage: '',
  errorMessage: '',
  deviceId: '',
  isBackupDialogOpen: false,
  backupStage: BackupStage.None,
};

export const getBackup = createAction(SagaActionTypes.GetBackup);
export const generateBackup = createAction(SagaActionTypes.GenerateBackup);
export const saveBackup = createAction(SagaActionTypes.SaveBackup);
export const restoreBackup = createAction<string>(SagaActionTypes.RestoreBackup);
export const clearBackup = createAction(SagaActionTypes.ClearBackup);
export const debugDeviceList = createAction<string[]>(SagaActionTypes.DebugDeviceList);
export const debugRoomKeys = createAction<string>(SagaActionTypes.DebugRoomKeys);
export const fetchDeviceInfo = createAction<string[]>(SagaActionTypes.FetchDeviceInfo);
export const resendKeyRequests = createAction(SagaActionTypes.ResendKeyRequests);
export const discardOlm = createAction<string>(SagaActionTypes.DiscardOlm);
export const restartOlm = createAction<string>(SagaActionTypes.RestartOlm);
export const shareHistoryKeys = createAction<{ roomId: string; userIds: string[] }>(SagaActionTypes.ShareHistoryKeys);
export const openBackupDialog = createAction(SagaActionTypes.OpenBackupDialog);
export const closeBackupDialog = createAction(SagaActionTypes.CloseBackupDialog);
export const onVerifyKey = createAction(SagaActionTypes.VerifyKey);

const slice = createSlice({
  name: 'matrix',
  initialState,
  reducers: {
    setLoaded: (state, action: PayloadAction<MatrixState['isLoaded']>) => {
      state.isLoaded = action.payload;
    },
    setGeneratedRecoveryKey: (state, action: PayloadAction<MatrixState['generatedRecoveryKey']>) => {
      state.generatedRecoveryKey = action.payload;
    },
    setTrustInfo: (state, action: PayloadAction<MatrixState['trustInfo']>) => {
      state.trustInfo = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<MatrixState['successMessage']>) => {
      state.successMessage = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<MatrixState['errorMessage']>) => {
      state.errorMessage = action.payload;
    },
    setDeviceId: (state, action: PayloadAction<MatrixState['deviceId']>) => {
      state.deviceId = action.payload;
    },
    setIsBackupDialogOpen: (state, action: PayloadAction<MatrixState['isBackupDialogOpen']>) => {
      state.isBackupDialogOpen = action.payload;
    },
    setBackupStage: (state, action: PayloadAction<MatrixState['backupStage']>) => {
      state.backupStage = action.payload;
    },
  },
});

export const {
  setLoaded,
  setIsBackupDialogOpen,
  setGeneratedRecoveryKey,
  setTrustInfo,
  setSuccessMessage,
  setErrorMessage,
  setDeviceId,
  setBackupStage,
} = slice.actions;
export const { reducer } = slice;
