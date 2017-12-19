import {
  ADD_PHOTO,
  REMOVE_PHOTO,
} from '../constants'

export function addPhoto(photo) {
  return {
    type: ADD_PHOTO,
    photo,
  }
}
