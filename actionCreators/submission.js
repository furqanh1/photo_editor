import {
  UPLOADING_SUBMISSION,
  UPLOADED_SUBMISSION,
  GENERATING_SUBMISSION,
  GENERATED_SUBMISSION,
  CLEAR_SUBMISSION,
  CLEAR_SUBMISSION_ITEM,
  DPI_TOO_SMALL,
  DPI_NOT_TOO_SMALL,
} from '../constants'

import {
  dataURItoBlob,
} from '../utils'
export function uploadingSubmission() {
  return {
    type: UPLOADING_SUBMISSION,
  }
}
export function clearSubmission() {
  return {
    type: CLEAR_SUBMISSION,
  }
}

export function clearSubmissionItem() {
  return {
    type: CLEAR_SUBMISSION_ITEM,
  }
}


export function uploadedSubmission(json) {
  return {
    type: UPLOADED_SUBMISSION,
    data: json,
  }
}

export function uploadSubmission(data) {
  return function(dispatch, getStore) {
    // dispatch(uploadingSubmission())

    // const { currentProduct } = getStore()
    setTimeout(function(){
      // let data = new FormData()
      // data.append('product_id', currentProduct.id)

      // const { crops } = getStore()
      const { cropDimension } = getStore()

      cropDimension.map(function(crop){
        data.append('h',crop.height)
        data.append('w',crop.width)
        data.append('rotate',crop.rotate)
        data.append('scaleX',crop.scaleX)
        data.append('scaleY',crop.scaleY)
        data.append('x',crop.x)
        data.append('y',crop.y)
      })

      // crops.forEach(crop => data.append('photo', dataURItoBlob(crop)))

      return fetch(API_BASE_URL + '/api/v1/submissions', {
        method: 'POST',
        body: data,
      })
        .then(response => response.json())
        .then(json => {
          
          dispatch(uploadedSubmission(json))
          dispatch(generateSubmission())
          dispatch(dpiRemoveError())
        })
    }, 10);
  }
}

export function generatingSubmission() {
  return {
    type: GENERATING_SUBMISSION,
  }
}

export function generatedSubmission(json) {
  return {
    type: GENERATED_SUBMISSION,
    data: json,
  }
}

export function generateSubmission() {
  return function(dispatch, getStore) {
    dispatch(generatingSubmission())

    const { currentProduct } = getStore()
    const { submission } = getStore()

    let data = new FormData()

    return fetch(API_BASE_URL + '/api/v1/submissions/' + submission.item.id + '/generate', {
      method: 'PUT',
      body: data,
    })
      .then(response => response.json())
      .then(json =>
        dispatch(generatedSubmission(json))
      )
  }
}


export function dpiError() {
  return {
    type: DPI_TOO_SMALL,
  }
}

export function dpiRemoveError() {
  return {
    type: DPI_NOT_TOO_SMALL,
  }
}

export function verifyDPI() {
  return function(dispatch, getStore) {
    dispatch(uploadingSubmission())

    const { currentProduct } = getStore()
    
    let data = new FormData()
    
    let data2 = new FormData()
    
    data.append('product_id', currentProduct.id)

    const { crops } = getStore()

    const { photos } = getStore()

    data2 = data

    crops.forEach(crop => data2.append('photo', dataURItoBlob(crop)))
    
    photos.forEach(crop => data.append('photo', dataURItoBlob(crop)))

    return fetch(API_BASE_URL + '/api/v1/submissions/verify_dpi', {
      method: 'POST',
      body: data,
    })
      .then(response => response.json())
      .then(json => {
        if(json){
          dispatch(uploadSubmission(data2))
        }
        else{
          dispatch(dpiError())
        }
          
      })
  }
}