/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-var */
/* eslint-disable import/extensions */
/* eslint-disable space-infix-ops */
/* eslint-disable quotes */
/* eslint-disable prefer-template */
/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable semi */
/* eslint-disable keyword-spacing */
/* eslint-disable no-useless-constructor */
/* eslint-disable space-before-blocks */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE } from '../../configs/constants.js';
import RandomUtils from '../../lib/utils/math.js';

var start = 0;
class Slider extends Component{
  constructor(props){
    super(props);
    console.log(PUBLIC_IMAGE_FOLDER)
    console.log(DEFAULT_BANNER_IMAGE);
    this.state={
      index: 0,
    }
  }


  componentDidMount() {
    setInterval(() => {
      const rand = this.props.random;
      rand ? (start = RandomUtils.getRandomNumber(this.props.banners.length)):(start = RandomUtils.getNextRoundRobin(this.props.banners.length, this.state.index))
      this.setState({ index: start })
      console.log(this.state);
    }, this.props.duration);
  }

  componentWillUnmount() {
    clearInterval();
  }

  render(){
    let defaultPath = this.props.defaultBanner;
    // eslint-disable-next-line no-unused-expressions
    (this.props.banners.length > 0) ? (defaultPath = PUBLIC_IMAGE_FOLDER + this.props.banners[this.state.index]):defaultPath;

    const styleContainer = {

      display: "flex",
      justifyContent: "center",
      marginBottom: "70px",
      marginLeft: "50px",
      marginRight: "50px",
      height: this.props.height,

    }
    return(
      <>
        <div style={styleContainer}>
    
    
          <img src={defaultPath} style={{ width: "70%",
      height: "110%" }}/>
</div>
      </>
    )
  }
}

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 1000,
  height: 200,
  random: false,
}
Slider.propsTypes = {
  altText: PropTypes.string.required,
  banners: PropTypes.array.required,
  defaultBanner: PropTypes.string.required,
  duration: PropTypes.number.required,
  height: PropTypes.number.required,
  random: PropTypes.bool.required,
}

export default Slider;
