import { call, put, select, takeLatest } from 'redux-saga/effects';

import { SagaActionTypes, setBackup, setErrorMessage, setLoaded, setSuccessMessage, setTrustInfo } from '.';
import { chat } from '../../lib/chat';

export function* saga() {
  yield takeLatest(SagaActionTypes.GetBackup, getBackup);
  yield takeLatest(SagaActionTypes.GenerateBackup, generateBackup);
  yield takeLatest(SagaActionTypes.SaveBackup, saveBackup);
  yield takeLatest(SagaActionTypes.RestoreBackup, restoreBackup);
  yield takeLatest(SagaActionTypes.ClearBackup, clearBackupState);
}

export function* getBackup() {
  yield put(setLoaded(false));
  const chatClient = yield call(chat.get);
  const existingBackup = yield call([chatClient, chatClient.getSecureBackup]);
  if (!existingBackup || !existingBackup.backupInfo) {
    yield put(setTrustInfo(null));
  } else {
    yield put(
      setTrustInfo({
        usable: existingBackup.trustInfo.usable,
        trustedLocally: existingBackup.trustInfo.trusted_locally,
      })
    );
  }
  yield put(setLoaded(true));
}

export function* generateBackup() {
  const chatClient = yield call(chat.get);
  const newBackup = yield call([chatClient, chatClient.generateSecureBackup]);
  yield put(setBackup(newBackup));
}

export function* saveBackup() {
  yield put(setSuccessMessage(''));
  yield put(setErrorMessage(''));
  const backup = yield select((state) => state.matrix.backup);
  const chatClient = yield call(chat.get);
  try {
    yield call([chatClient, chatClient.saveSecureBackup], backup);
    yield put(setBackup(null));
    yield call(getBackup);
    yield put(setSuccessMessage('Backup saved successfully'));
  } catch {
    yield put(setErrorMessage('Backup save failed'));
  }
}

export function* restoreBackup(action) {
  yield put(setSuccessMessage(''));
  yield put(setErrorMessage(''));
  const chatClient = yield call(chat.get);
  const recoveryKey = action.payload;
  try {
    yield call([chatClient, chatClient.restoreSecureBackup], recoveryKey);
    yield call(getBackup);
    yield put(setSuccessMessage('Backup restored successfully'));
  } catch (e) {
    yield put(setErrorMessage('Failed to restore backup: Check your recovery key and try again'));
  }
}

export function* clearBackupState() {
  yield put(setLoaded(false));
  yield put(setTrustInfo(null));
  yield put(setBackup(null));
  yield put(setSuccessMessage(''));
  yield put(setErrorMessage(''));
}