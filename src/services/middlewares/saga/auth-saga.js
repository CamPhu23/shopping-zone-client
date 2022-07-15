import _ from 'lodash';
import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { loginFail, loginSuccess, logoutSuccess, refreshTokenSuccess, registerFail, registerSuccess } from '../../actions/auth-action';
import { type as actionTypes } from '../../constants/auth-constant';
import { authService, adminAuthService, systemService } from '../../modules'

// worker Saga: will be fired on AUTH_LOGIN_REQUEST actions
function* loginWorker(action) {
  try {
    let response;
    let payload = action.payload
    if (!_.isEmpty(payload.isClient) || payload.isClient === false) {
      response = yield call(adminAuthService.handleLogin, payload);
    }
    else {
      response = yield call(authService.handleLogin, payload);
    }

    const { accessToken, refreshToken, user } = response;
    yield put(loginSuccess({ accessToken, user }));
    systemService.saveRefreshToken(refreshToken);
  } catch (e) {
    const { status } = JSON.parse(e.message);
    const message = status == 404
      ? "Tên tài khoản hoặc mật khẩu bị sai"
      : "Lỗi đăng nhập, vui lòng thử lại";

    yield put(loginFail({ status, message }))
  }
}

function* googleLoginWorker(action) {
  try {
    let response;
    let payload = action.payload
    response = yield call(authService.handleGoogleLogin, payload);

    const { accessToken, refreshToken, user } = response;
    yield put(loginSuccess({ accessToken, user }));
    systemService.saveRefreshToken(refreshToken);
  } catch (e) {
    const { status } = JSON.parse(e.message);
    const message = status == 404
      ? "Tên tài khoản hoặc mật khẩu bị sai"
      : "Lỗi đăng nhập, vui lòng thử lại";

    yield put(loginFail({ status, message }))
  }
}

function* refreshTokenWorker(action) {
  try {
    let response;
    let payload = action.payload
    if (!_.isEmpty(payload.isClient) || payload.isClient === false) {
      response = yield call(adminAuthService.handleRefreshToken, payload);
    } else {
      response = yield call(authService.handleRefreshToken, payload);
    }
    const { accessToken, refreshToken, user } = response;
    yield put(refreshTokenSuccess({ newAccessToken: accessToken, newUser: user }));
    systemService.saveRefreshToken(refreshToken);
  } catch (error) {
    console.log(error.message);
  }
}

function* registerWorker(action) {
  try {
    const response = yield call(authService.handleRegister, action.payload);
    const { accessToken, refreshToken, user } = response;
    yield put(registerSuccess({ registerAccessToken: accessToken, registerUser: user }));
    systemService.saveRefreshToken(refreshToken);
  } catch (error) {
    const { status } = JSON.parse(error.message);
    const message = status == 400
      ? "Tên tài khoản hoặc email đã tồn tại"
      : "Lỗi đăng ký, vui lòng thử lại sau";

    yield put(registerFail({ status, message }))
    console.log(error.message); //something like that: {"status":404,"statusText":"Not Found"}
  }
}

function* logoutWorker() {
  try {
    yield call(authService.handleLogout);
    yield delay(1000);
    yield put(logoutSuccess());
  } catch (error) {
    console.log(error.message);
  }
}

function* authSaga() {
  yield takeEvery(actionTypes.AUTH_LOGIN_REQUEST, loginWorker);
  yield takeEvery(actionTypes.GOOGLE_LOGIN_REQUEST, googleLoginWorker);
  yield takeLatest(actionTypes.AUTH_REFRESH_TOKEN_REQUEST, refreshTokenWorker);
  yield takeEvery(actionTypes.AUTH_REGISTER_REQUEST, registerWorker);
  yield takeLatest(actionTypes.AUTH_LOGOUT_REQUEST, logoutWorker);
}

export default authSaga;