import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  SELECT_PRODUCT,
} from '../constants'
import {
  dataURItoBlob,
} from '../utils'

export function requestProducts() {
  return {
    type: REQUEST_PRODUCTS,
  }
}

export function receiveProducts(json) {
  return {
    type: RECEIVE_PRODUCTS,
    data: json,
  }
}

export function fetchProducts() {
  return function(dispatch, getStore) {
    dispatch(requestProducts())

    let data = new FormData()



    return fetch(API_BASE_URL + '/api/v1/products', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json =>
        dispatch(receiveProducts(json))
      )
  }
}

export function selectProduct(id) {
  return {
    type: SELECT_PRODUCT,
    id: id
  }
}
export function selectAndfetchProducts(id) {
  return function(dispatch, getStore) {
    dispatch(requestProducts())
    let data = new FormData()
    return fetch(API_BASE_URL + '/api/v1/products', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json =>{
        let selected = json.find(item => (item.id == id || item.sku == id))
        if (selected) {
        dispatch(selectProduct(selected.id))
        }
        dispatch(receiveProducts(json))
      })
  }
}
