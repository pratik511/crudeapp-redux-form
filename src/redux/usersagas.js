import { take, takeEvery, takeLatest, put, all, delay, fork, call } from "redux-saga/effects";
import { loadUsersSuccess, loadUsersError, createUsersSuccess, createUsersError, deleteUsersSuccess, deleteUsersError ,updateUsersSuccess,updateUsersError } from "./actions";
import * as types from "./actionsTypes"
import { loadUsersApi, createUserApi, deleteUserApi, updateUserApi } from './api';


function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadUsersSuccess(response.data))
        }
    }
    catch (error) {
        yield put(loadUsersError(error.response.data))
    }
}
function* onCreateUsersStartAsync({ payload }) {
    try {
        const response = yield call(createUserApi, payload);
        if (response.status === 200) {

            yield put(createUsersSuccess(response.data))
        }
    }
    catch (error) {
        yield put(createUsersError(error.response.data))
    }
}

function* deleteUsersStartAsync(userId) {
    try {
        const response = yield call(deleteUserApi, userId);
        if (response.status === 200) {
            yield delay(500);
            yield put(deleteUsersSuccess(userId))
        }
    }
    catch (error) {
        yield put(deleteUsersError(error.response.data))
    }
}

function* onUpdateUsersStartAsync({ payload : {id , formValue}}) {
    try {
        const response = yield call(updateUserApi,id,formValue);
        if(response.status === 200){
            yield put(updateUsersSuccess())
        }
    }
    catch (error) {
        yield put(updateUsersError(error.response.data))
    }
}



function* deleteUsers() {
    while (true) {
        const { payload: userId } = yield take(types.DELETE_USER_START);
        yield call(deleteUsersStartAsync, userId)
    }
}

function* onLoadUsers() {
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync)
}

function* onCreateUser() {
    yield takeLatest(types.CREATE_USER_START, onCreateUsersStartAsync)
}
function* onUpdateUser() {
    yield takeLatest(types.UPDATE_USER_START, onUpdateUsersStartAsync)
}

const userSagas = [fork(onLoadUsers), fork(onCreateUser), fork(deleteUsers), fork(onUpdateUser)];

export default function* rootSaga() {
    yield all([...userSagas]);
}