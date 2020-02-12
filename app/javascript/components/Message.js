import React from "react"
import PropTypes from 'prop-types';
import * as Const from '../constants';
import ChatButton from '../components/ChatButton';

const ImagePosition = 
{
    RIGHT:     false,
    LEFT:      true
}


function GenerateRandomTitle()
{
    return ["Member", "Member", "Member", "Member", "Member", "Member", "Member", "Trusted Member", "Trusted Member", "Moderator"][Math.floor(Math.random() * 10)];
}

function GenerateRandomStars()
{
    var filledStars = Math.floor(Math.random() * 5);
    var stars = "";
    for (var i = 0; i < filledStars; i++) { stars += "★"; }
    for (var i = filledStars; i < 5; i++) { stars += "☆"; }
    return stars;
}

class Message extends React.Component 
{
  render () 
  { 
    const { creationDate, index, name, text, image } = this.props;

    return (
        <React.Fragment >
        <div  className="message">

            <div className="row">
                <div className="col-12">
                    <div  className="container message-top">
                        <div className="row">


                        <div className="col-6 text-left">
                        <strong>#{index} ({creationDate})</strong>
                            
                        </div>
                        <div className="col-6 text-right">
                            {name}
                        </div>
            
                        </div>  
                    </div>  
                </div>                
            </div>
            
            <br/>

            <div className="row">
                <div className="col-3 text-center">
                    <img className="img-responsive fit-image" src={Const.avatars[image]}/>
                    <strong>{name}</strong>
                    <br/>
                    {GenerateRandomTitle()}
                    <br/>
                    {GenerateRandomStars()}
                </div>
                <div className="col-9 full-width">
                    {text}
                </div>
            </div>
            

                <div className="row">
                    <ChatButton text="Edit"/>
                    <ChatButton text="Delete"/>
                </div>            

                <br/>
            </div>

            <br/>

        </React.Fragment>
    );
  }
}

Message.defaultProps = 
{
    imagePosition: ImagePosition.LEFT,
    name: "Baggu",
    text: "I AM ERROR",
    image: 1,
    index: -1,
    creationDate: "11-11-2011"
}

Message.propTypes = 
{
    imagePosition: PropTypes.oneOf(Object.values(ImagePosition)),
    name: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.number,
    index: PropTypes.number,
    creationDate: PropTypes.object
};

Message.ImagePosition = ImagePosition
export default Message
