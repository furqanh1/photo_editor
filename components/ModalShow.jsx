import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'
import Input from 'react-bootstrap/lib/Input'

import {
  ImagePicker,
  ImageCropper,
  Preview,
} from '../components'


import {
  showModal,
  hideModal,
  closeModal,
  imagePicked,
  imageNotPicked,
  verifyDPI,
  showImageResult,
  fetchProducts,
  imageIsTooLarge,
  imageLimitExceed,
  selectAndfetchProducts,
  hidePreviewResult,
  clearSubmission,
  clearSubmissionItem
} from '../actionCreators'

import '../styles/layout.scss'

class ModalShow extends Component {
  openModalButtonHandle(){
    const { showModal } = this.props
    showModal()
    const { loadProductsEarly } = this.props
    loadProductsEarly("pillow ");
  }
  close(){
    const { clearSubmission } = this.props
    clearSubmission()
    const { hideModal } = this.props
    hideModal()
  }
  closeModal(){
    const { clearSubmission } = this.props
    clearSubmission()

    const { clearSubmissionItem } = this.props
    clearSubmissionItem()

    const { closeModal } = this.props
    closeModal()
  }
  IU(){
  }
  changeImage(){
    const { imageNotPicked } = this.props
    imageNotPicked()
  }
  hidePreviewResultFromModal(){
    const { hidePreviewResult } = this.props
    hidePreviewResult()
    const { clearSubmission } = this.props
    clearSubmission()
  }
  previewResults(){
    const { verifyDPI } = this.props
    verifyDPI()
    const { showImageResult } = this.props
    showImageResult()

  }
  render() {
    
    const { modal ,products, submission} = this.props
    const { dpiError, isGenerating, isGenerated } = submission
    return (
      <div>
            {modal.isShowingModal && products.isLoaded &&
                <Modal show={modal.isShowingModal} onHide={this.closeModal.bind(this)}  container={this} className="photo-picker-modal">
                    <Modal.Header closeButton>
                      {!modal.isResultShowing && !modal.isPicked &&
                        <h2>Upload Photo</h2>
                      }
                      {!modal.isResultShowing && modal.isPicked &&
                        <h2>Crop Photo</h2>
                      }
                      {modal.isResultShowing &&
                        <h2>preview</h2>
                      }
                    </Modal.Header>
                    <Modal.Body>
                      <div className="container">
                        {!modal.isResultShowing && modal.isPicked &&
                          <div className="image-viewer">
                            <div>
                              <ImageCropper />
                            </div>
                          </div>
                        }
                        {modal.isResultShowing &&
                          <div className="image-viewer">
                            <div>
                              <Preview />
                            </div>
                          </div>
                        }

                        {!modal.isResultShowing  && !modal.isPicked  &&
                            <div className="image-viewer">
                              <div>
                                <ImagePicker />
                              </div>
                            </div>
                          }

                         


                        {modal.imageisTooLargeSized &&
                          <h5 className="error-msg"> <img src="/media/wysiwyg/pp_warning_icon.jpg" width="19px;" /> <strong className="error-msg-heading">Error: </strong> Image resolution too small, Photos must be at least 400x400 pixels. Please upload another photo. </h5>
                        }
                        {modal.imageLimitExceeded &&
                          <h5 className="error-msg"> <img src="/media/wysiwyg/pp_warning_icon.jpg" width="19px;" /> <strong className="error-msg-heading">Error: </strong> Image size must be less than 10 MB. </h5>
                        }

                        {modal.dpiError &&
                          <h5 className="error-msg"><strong className="error-msg-heading">Error: </strong> Image quality shoud be at least 150 DPI. </h5>
                        }


                      </div>
                    </Modal.Body>

                    <Modal.Footer>
                        {!modal.isResultShowing && modal.isPicked &&
                          <div className="clearfix">
                            <div className="footer-text">
                              <strong>Note:</strong> Photos must be 20MB or smaller and must be at least 150dpi.
                            </div>
                            <div className="form-feilds">
                              <div className="two-btns-group">
                                <Button bsStyle="link" onClick= {this.changeImage.bind(this)} className="btn-link-back"><span className="dbl-arrow">&laquo;</span> Change image</Button>
                                <Button onClick= {this.previewResults.bind(this)} bsStyle="success" >PREVIEW <span className="dbl-arrow">&raquo;</span></Button>
                              </div>
                            </div>
                          </div>
                        }
                        {isGenerated &&
                          <div className="form-feilds">
                            <div className="two-btns-group">
                              <Button bsStyle="link" onClick= {this.hidePreviewResultFromModal.bind(this)} className="btn-link-back"><span className="dbl-arrow">&laquo;</span> back</Button>
                              <Button onClick= {this.close.bind(this)} bsStyle="success" > looks great, add to cart <span className="dbl-arrow">&raquo;</span></Button>
                            </div>
                          </div>
                        }
                    </Modal.Footer>
                </Modal>
              }
          </div>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    modal : state.modal,
    products: state.products,
    submission: state.submission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: () => {
      dispatch(showModal())
    },
    hideModal: () => {
      dispatch(hideModal())
    },
    closeModal: () => {
      dispatch(closeModal())
    },
    imagePicked: () => {
      dispatch(imagePicked())
    },
    imageNotPicked: () => {
      dispatch(imageNotPicked())
    },
    verifyDPI: () => {
      dispatch(verifyDPI())
    },
    showImageResult: () => {
      dispatch(showImageResult())
    },
    loadProductsEarly: (sid) => {
      dispatch(selectAndfetchProducts(sid))
    },
    hidePreviewResult: ()=>{
      dispatch(hidePreviewResult())
    },
    clearSubmission: ()=>{
      dispatch(clearSubmission())
    },
    clearSubmissionItem: ()=>{
      dispatch(clearSubmissionItem())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalShow)
