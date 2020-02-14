import React from "react"
import PropTypes from 'prop-types';

import ReactHtmlParser from 'react-html-parser'; 

class Header extends React.Component 
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
                    <p>{ReactHtmlParser(description)}</p>
                    <br/>
                    <p>{author != null ? "By: ": ""}{author}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
  }
}

Header.defaultProps = 
{
    author: "Baggu",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    title: "I AM ERROR"
}

Header.propTypes = 
{
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};

export default Header
