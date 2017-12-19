import {
  ADD_CROP,
  REMOVE_CROP,
  ADD_CROP_DATA,
} from '../constants'
import {
  dataURItoBlob,
} from '../utils'


export function addCrop(crop) {
  return {
    type: ADD_CROP,
    crop,
  }
}

export function addCropFinal(cropData) {
  return {
    type: ADD_CROP_DATA,
    cropData,
  }
}

export function addCropfinal(crop) {
    var x = crop.getCroppedCanvas().toDataURL()
    return function(dispatch) {
      dispatch(addCrop(x));
    }
}


export function addCropData(crop) {
    return function(dispatch) {
      dispatch(addCropFinal(crop));
    }
}