import { Joke } from './types'
import { ActionTypes } from './action.types'

export const fetchJokesStart = () => ({
  type: ActionTypes.FETCH_JOKES_START,
})

export const fetchJokesSuccess = (joke: Joke) => ({
  type: ActionTypes.FETCH_JOKES_SUCCESS,
  payload: joke,
})

export const fetchJokesFailure = (errorMessage: string) => ({
  type: ActionTypes.FETCH_JOKES_FAILURE,
  payload: errorMessage,
})

export const addJokeToFavourites = (id: string) => ({
  type: ActionTypes.ADD_JOKE_TO_FAVOURITES,
  payload: id,
})

export const removeJokeFromFavourites = (id: string) => ({
  type: ActionTypes.REMOVE_JOKE_FROM_FAVOURITES,
  payload: id,
})

export const eraseFavourites = () => ({
  type: ActionTypes.ERASE_FAVOURITES,
})

export const clearErrorMessage = () => ({
  type: ActionTypes.CLEAR_ERROR_MESSAGE,
})
