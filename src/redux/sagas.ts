import { Joke } from './types'
import { ActionTypes } from './action.types'
import { fetchJokesSuccess, fetchJokesFailure } from './actions'
import { takeLatest, put, StrictEffect, call, all } from 'redux-saga/effects'
import axios from '../utils/axios'

export function* jokesSaga(): Generator<StrictEffect> {
  yield takeLatest(ActionTypes.FETCH_JOKES_START, fetchJokeStartAsync)
}

interface IResponse {
  data: Joke
}

function isCorrect(response: any): response is IResponse {
  return `data` in response
}

function* fetchJokeStartAsync(): Generator<StrictEffect> {
  try {
    const response = yield call(axios.get, '/random')
    if (response && isCorrect(response)) {
      const joke = { id: response.data.id, value: response.data.value }
      yield put(fetchJokesSuccess(joke))
    } else {
      console.log(response)
    }
    //  }
  } catch (error) {
    yield put(fetchJokesFailure(`Try Again Please`))
  }
}

export default function* rootSaga() {
  yield all([call(jokesSaga)])
}
