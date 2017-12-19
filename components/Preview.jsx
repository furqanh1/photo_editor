import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actionCreators'
import Spinner from 'react-spinkit'
import Input from 'react-bootstrap/lib/Input'

class Preview extends Component {

  handleChange(event) {
    let value = event.target.value;
  }

  render() {

    const { submission, value } = this.props
    const {isGenerating, isGenerated } = submission

    return (
      <div className="preview-con">
          {isGenerating &&
            <div className="preview-text">
                <img src="/media/wysiwyg/pp_star.gif" />
                <p className="uploading_photo_message">GENERATING PREVIEW</p>
            </div>
          }
        {isGenerated &&
          <div className="preview-generated">
            <img src={submission.item.original_preview_image_url} />
            <br/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    submission: state.submission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
