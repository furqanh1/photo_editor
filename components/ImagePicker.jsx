import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

import {
  addPhoto,
  fetchSubmission,
  imagePicked,
  imageIsTooLarge,
  imageLimitExceed,
  imageIsNotTooLarge,
  imageLimitNotExceed,
} from '../actionCreators'


class ImagePicker extends Component {
  onDrop(files) {
    let imageSize
    const { imageIsTooLarge } = this.props
    const { imageLimitExceed } = this.props
    const { imageIsNotTooLarge } = this.props
    const { imageLimitNotExceed } = this.props
    const { addPhoto } = this.props
    const { imagePicked } = this.props
    let file  = files[0]
    imageSize = file.size/20971520
    // let maxLimit = 2000
    let maxLimit = 10000
    maxLimit = Math.ceil(file.size/1000000)

    if(imageSize > 1){
      imageIsTooLarge()
    }
    else {
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        let img = new Image;
        const photo = reader.result
        img.onload = function() {
          if(img.width < 400 && img.height < 400){
            imageIsTooLarge()
          }
          else if(maxLimit > 10){
            imageLimitExceed()
          }
          else{
            imageLimitNotExceed()
            imageIsNotTooLarge()
            imagePicked()
          }
        };
        img.src = photo;
        imageIsNotTooLarge()
        addPhoto(photo)
      })
      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }


  render() {
      var backgroundUrl;
      const { modal, product, currentProduct, submission } = this.props
      // backgroundUrl = (submission.item && !modal.isResultShowing) ? submission.item.original_preview_image_url : product.items[currentProduct.idx].original_product_image_url;
      backgroundUrl = "http://cps-photo-processor-production.s3.amazonaws.com/products/product_images/000/000/041/original/62896_Ceramic-Star-Ornament-Silo_RawA.jpg?1496397911";
      var divStyle = {
        backgroundImage: 'url('+backgroundUrl+')',
        WebkitTransition: 'all',
        msTransition: 'all',
        backgroundRepeat: "no-repeat"
      }

    return (
        <Dropzone onDrop={this.onDrop.bind(this)} accept="image/*" >
          <div className="image-picker">
            <div className="image-picker-bg" style={divStyle}></div>
            <div className="select-image-text">
              <p>Drag or <br/> upload photo</p>
              <img src='/media/wysiwyg/pp_camera.png' />
            </div>
          </div>
        </Dropzone>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    modal : state.modal,
    product : state.products,
    currentProduct: state.currentProduct,
    submission: state.submission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPhoto: (photo) => {
      dispatch(addPhoto(photo))
    },
    imagePicked: () => {
      dispatch(imagePicked())
    },
    imageIsTooLarge: () => {
      dispatch(imageIsTooLarge())
    },
    imageIsNotTooLarge: () => {
      dispatch(imageIsNotTooLarge())
    },
    imageLimitExceed: () => {
      dispatch(imageLimitExceed())
    },
    imageLimitNotExceed: () => {
      dispatch(imageLimitNotExceed())
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePicker)
