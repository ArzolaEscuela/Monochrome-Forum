import React from "react"
import PropTypes from 'prop-types';
import * as Const from '../constants';
import ChatButton from '../components/ChatButton';


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

class ForumTopic extends React.Component 
{
  render () 
  { 
    const { author, description, title } = this.props;

    return (
        <React.Fragment >
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center forum-topic">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <br/>
                    <p>By: {author}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
  }
}

ForumTopic.defaultProps = 
{
    author: "Baggu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "I AM ERROR"
}

ForumTopic.propTypes = 
{
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};

export default ForumTopic
