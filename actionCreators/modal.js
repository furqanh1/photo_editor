import {
  SHOW_MODAL,
  HIDE_MODAL,
  IMAGE_PICKED,
  IMAGE_NOT_PICKED,
  SHOW_IMAGE_RESULT,
  IMAGE_IS_TOO_LARGE,
  IMAGE_LIMIT_EXCEED,
  IMAGE_LIMIT_NOT_EXCEED,
  IMAGE_IS_NOT_TOO_LARGE,
  HIDE_PREVIEW_RESULT,
  CLOSE_MODAL,
  STOP_CALLBACK,

} from '../constants'

export function showModal() {
  return {
    type: SHOW_MODAL
  }
}
export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}
export function imagePicked() {
  return {
    type: IMAGE_PICKED
  }
}
export function imageNotPicked() {
  return {
    type: IMAGE_NOT_PICKED
  }
}
export function showImageResult() {
  return {
    type: SHOW_IMAGE_RESULT
  }
}
export function imageIsTooLarge() {
  return {
    type: IMAGE_IS_TOO_LARGE
  }
}
export function imageLimitExceed() {
  return {
    type: IMAGE_LIMIT_EXCEED
  }
}


export function imageLimitNotExceed() {
  return {
    type: IMAGE_LIMIT_NOT_EXCEED
  }
}

export function imageIsNotTooLarge() {
  return {
    type: IMAGE_IS_NOT_TOO_LARGE
  }
}
export function hidePreviewResult() {
  return {
    type: HIDE_PREVIEW_RESULT
  }
}

export function stopCallBack() {
  return {
    type: STOP_CALLBACK,
  }
}
