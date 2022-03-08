import { getRandomStartingJoke } from './../utils/getRandomStartingJoke'
import { addNewItem } from '../utils/modifier'
import { ActionTypes } from './action.types'
import { State, Action } from './types'

const initialState: State = {
  loading: false,
  joke: getRandomStartingJoke(),
  favourites: [],
  errorMessage: null,
}

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.FETCH_JOKES_START:
      return { ...state, loading: true, errorMessage: null }
    case ActionTypes.FETCH_JOKES_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null,
        joke: action.payload,
      }
    case ActionTypes.FETCH_JOKES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      }
    case ActionTypes.ADD_JOKE_TO_FAVOURITES:
      return {
        ...state,
        favourites: addNewItem(
          state.favourites.length < 10
            ? state.favourites
            : state.favourites.filter((_, i) => i !== 9),
          state.joke
        ),
      }
    case ActionTypes.REMOVE_JOKE_FROM_FAVOURITES:
      ////////////!!!
      return {
        ...state,
        favourites: state.favourites.filter((el) => el.id !== action.payload),
      }
    case ActionTypes.ERASE_FAVOURITES:
      return {
        ...state,
        favourites: [],
      }
    case ActionTypes.CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: null }

    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>
