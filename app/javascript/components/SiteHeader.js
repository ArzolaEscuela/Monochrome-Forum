import React from "react"
import PropTypes from 'prop-types';
import * as Const from '../../../config/_constants';

const ImagePosition = 
{
    RIGHT:     false,
    LEFT:      true
}

function DrawImage(shouldDraw, image)
{
    if (!shouldDraw) { return <span/>;}

    return (
        <React.Fragment>
            <div className="col-2 full-width">
                <img className="img-responsive fit-image" src={Const.avatars[image]}/>
            </div>
        </React.Fragment>
    );
}

class SiteHeader extends React.Component 
{
  render () 
  { 
    const { imagePosition, name, text, image } = this.props;

    const textClass = `col-10 ${imagePosition ? 'text-left': 'text-right'}`;

    return (
        <React.Fragment>
        <a href="/">
            <div className="container d-flex justify-content-center unselectable"> 
                <div className="col-6 forum-header">
                    <h1 className="text-center">Monochromatic Forum</h1>
                    <p className="text-center"><i>It's like a regular forum, <u>only worse</u>.</i></p>
                </div>
            </div>
        </a>
        </React.Fragment>
    );
  }
}

SiteHeader.defaultProps = 
{
    imagePosition: ImagePosition.LEFT,
    name: "Baggu",
    text: "I AM ERROR",
    image: 1
}

SiteHeader.propTypes = 
{
    imagePosition: PropTypes.oneOf(Object.values(ImagePosition)),
    name: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.number
};

SiteHeader.ImagePosition = ImagePosition
export default SiteHeader
