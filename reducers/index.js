import { combineReducers } from 'redux'

import {
  ADD_PHOTO,
  REMOVE_PHOTO,
  ADD_CROP,
  ADD_CROP_DATA,
  REMOVE_CROP,
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  SELECT_PRODUCT,
  UPLOADING_SUBMISSION,
  UPLOADED_SUBMISSION,
  GENERATING_SUBMISSION,
  GENERATED_SUBMISSION,
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
  CLEAR_SUBMISSION,
  CLOSE_MODAL,
  STOP_CALLBACK,
  CLEAR_SUBMISSION_ITEM,
  DPI_TOO_SMALL,
  DPI_NOT_TOO_SMALL

} from '../constants'

function products(state = { items: [] }, action) {
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        items: action.data
      }

    default:
      return state
  }
}

function currentProduct(state = { id: null }, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        id: action.id,
      }
    case RECEIVE_PRODUCTS:
      var s = action.data.find(function(x) {return x.id == state.id})
      var idx = action.data.findIndex(function(x) {return x == s})
      return {
        ...state,
        id: state.id,
        idx: idx,
      }

    default:
      return state
  }
}

function photos(state = [], action) {
  switch (action.type) {
    case ADD_PHOTO:
      return [

        action.photo,
      ]
    default:
      return state
  }
}

function modal(state = {}, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
         ...state,
        isShowingModal: true,
        isPicked: false,
        isResultShowing: false,
        imageLimitExceeded: false,
        imageisTooLargeSized: false,
      }
    case HIDE_MODAL:
      return {
        ...state,
        isShowingModal: false,
        isPicked: false,
        isResultShowing: false,
        imageisTooLargeSized: false,
        imageLimitExceeded: false,
        isModalClose: false,
      }

    case DPI_TOO_SMALL:
      return {
         ...state,
        isShowingModal: true,
        isPicked: false,
        isResultShowing: false,
        imageLimitExceeded: false,
        imageisTooLargeSized: false,
        dpiError: true,
      }

      case DPI_NOT_TOO_SMALL:
      return {
         ...state,
        
        dpiError: false,
      }



    case CLOSE_MODAL:
      return {
        ...state,
        isShowingModal: false,
        isModalClose: true,
      }
    case IMAGE_PICKED:
      return {
         ...state,
        isPicked: true,
        isResultShowing: false,
      }
    case IMAGE_NOT_PICKED:
      return {
         ...state,
        isPicked: false,
        isResultShowing: false,
      }
    case SHOW_IMAGE_RESULT:
      return {
         ...state,
        isPicked: false,
        isResultShowing: true,
      }
    case IMAGE_IS_TOO_LARGE:
      return {
         ...state,
        imageisTooLargeSized: true,
      }
    case IMAGE_LIMIT_EXCEED:
      return {
         ...state,
        imageLimitExceeded: true,
      }

    case IMAGE_LIMIT_NOT_EXCEED:
      return {
         ...state,
        imageLimitExceeded: false,
      }


    case IMAGE_IS_NOT_TOO_LARGE:
        return {
         ...state,
        imageisTooLargeSized: false,
      }
    case HIDE_PREVIEW_RESULT:
        return {
          ...state,
        isResultShowing: false,
        isPicked: true,
      }

    case STOP_CALLBACK:
      return {
        ...state,
        isModalClose: true
      }
    default:
      return state
  }
}



function crops(state = [], action) {
  switch (action.type) {
    case ADD_CROP:
      return [
        // ...state,
        action.crop,
      ]
    default:
      return state
  }
}


function cropDimension(state = [], action) {
  switch (action.type) {
    case ADD_CROP_DATA:
      return [
        // ...state,
        action.cropData,
      ]
    default:
      return state
  }
}

function submission(state = {}, action) {
  switch (action.type) {
    // case DPI_TOO_SMALL1:
    //   return {
    //     ...state,
    //     dpiError: true,
    //     dpiSuccess: false,
      
    //     isGenerating: false,
    //     isGenerated: false,

    //     isPicked: false,
    //     isResultShowing: false,
    //   }

    case DPI_NOT_TOO_SMALL:
      return {
        ...state,
        dpiError: false,
        dpiSuccess: true,

        isPicked: false,
        isResultShowing: false,
      }

    case UPLOADING_SUBMISSION:
      return {
        ...state,
        isGenerating: true,
      }
    case UPLOADED_SUBMISSION:
      return {
        ...state,
        item: action.data,
      }

    case GENERATING_SUBMISSION:
      return {
        ...state,
        isGenerating: true,
      }

    case GENERATED_SUBMISSION:
      return {
        ...state,
        isGenerating: false,
        isGenerated: true,

        dpiError: false,
        dpiSuccess: false,

        item: action.data,
      }
    case CLEAR_SUBMISSION:
      return {
        ...state,
        isGenerating: false,
        isGenerated: false,
        
        dpiError: false,
        dpiSuccess: false,
      }

    case CLEAR_SUBMISSION_ITEM:
        return {
          ...state,
          item: null
        }

    default:
      return{
        ...state,
        isResultShowing: false,
        isPicked: false,
      }
  }
}

export default combineReducers({
  products,
  currentProduct,
  photos,
  crops,
  submission,
  modal,
  cropDimension,
})
