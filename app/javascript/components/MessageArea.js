import React from "react"
import PropTypes from 'prop-types';
import Message from './Message';

import { connect } from 'react-redux';
import { GetMessages } from '../redux/AppActions'

function GetSize(obj) 
{
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function DrawContents(allMessages)
{
    let left = false;
    let nameToImage = {};
    return allMessages.map((entry, id) => 
    {        
        left = !left;

        const name = entry['name'];
        const text = entry['text'];
        if (!(name in nameToImage))
        {
            nameToImage[name] = 1 + (GetSize(nameToImage) % 36);
        }
        
        return <span key={id}><Message image={nameToImage[name]} name={name} text={text} imagePosition={left ? Message.ImagePosition.LEFT: Message.ImagePosition.RIGHT}/></span>
    });
}

class MessageArea extends React.Component 
{
    componentDidMount()
    {
        this.props.GetMessages();
    }

    render () 
    { 
        const { allMessages} = this.props;

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11">
                        {DrawContents(allMessages)}
                    </div>
                </div>
            </div>
        );
    }
}

MessageArea.defaultProps = 
{
    allMessages: [],
    waiting: false
}

MessageArea.propTypes = 
{
    allMessages: PropTypes.any,
    waiting: PropTypes.bool
};

function mapStateToProps(state) 
{
   const { allMessages } = state

    return {
        allMessages: allMessages
    }; 
}

export default connect(mapStateToProps, {GetMessages: GetMessages})(MessageArea);