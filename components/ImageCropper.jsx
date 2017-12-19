import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cropper from 'react-cropper'
import '../../node_modules/cropperjs/dist/cropper.css'


import {
  ImagePicker
} from '../components'


import {
  addCrop,
  fetchProducts,
  selectProduct,
  addCropfinal,
  addCropData
} from '../actionCreators'

class ImageCropper extends Component {
  onCrop() {
    if(this.props.crops.length == 0){
      const { addCrop } = this.props
      addCrop(this.refs.cropper)
    }
  }
  onCropend() {
    const { addCrop } = this.props
    addCrop(this.refs.cropper)
  }
  componentWillUnmount(){
    const { addCropfinal } = this.props
    const { addCropData } = this.props
    addCropData(this.refs.cropper.getData())
    addCropfinal(this.refs.cropper)
  }
  render() {
    const { products, currentProductId, photos ,modal } = this.props
    var s = products.items.find(function(x) {return x.id == currentProductId})
    var idx = products.items.findIndex(function(x) {return x == s})
    return (
      <div className="image-cropper">
        

        {photos.map(photo => (
          <div>
            <Cropper
              ref="cropper"
              src={photo}
              style={{ width: 350, height: 300 }}
              preview=".img-preview"
              aspectRatio={products.items[idx].photo_specs[0].min_width / products.items[idx].photo_specs[0].min_height}
              guides={false}
              guides={true}
            />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currentProductId: state.currentProduct.id,
    photos: state.photos,
    crops: state.crops,
    modal: state.modal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCrop: (crop) => {
      dispatch(addCrop(crop))
    },
    loadProducts: () => {
      dispatch(fetchProducts())
    },
    selectProduct: (id) => {
      dispatch(selectProduct(id))
    },
    addCropfinal: (crop) => {
      dispatch(addCropfinal(crop))
    },
    addCropData: (crop) => {
      dispatch(addCropData(crop))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageCropper)
