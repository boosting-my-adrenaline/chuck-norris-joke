import { ActionTypes } from './action.types'
export interface Joke {
  id: string
  value: string
}

export interface State {
  loading: boolean
  joke: Joke
  // jokes: any[]
  favourites: Joke[]
  errorMessage: null | string
}

export type Action =
  | FetchJokesStart
  | FetchJokesSuccess
  | FetchJokesFailure
  | AddJokeToFavourites
  | RemoveJokeFromFavourites
  | EraseFavourites
  | ClearErrorMessage

interface FetchJokesStart {
  type: ActionTypes.FETCH_JOKES_START
}

interface FetchJokesSuccess {
  type: ActionTypes.FETCH_JOKES_SUCCESS
  payload: Joke
}

interface FetchJokesFailure {
  type: ActionTypes.FETCH_JOKES_FAILURE
  payload: string
}

interface AddJokeToFavourites {
  type: ActionTypes.ADD_JOKE_TO_FAVOURITES
  payload: string
}

interface RemoveJokeFromFavourites {
  type: ActionTypes.REMOVE_JOKE_FROM_FAVOURITES
  payload: string
}

interface EraseFavourites {
  type: ActionTypes.ERASE_FAVOURITES
}

interface ClearErrorMessage {
  type: ActionTypes.CLEAR_ERROR_MESSAGE
}
