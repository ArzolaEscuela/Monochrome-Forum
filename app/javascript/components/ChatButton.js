import React from "react"
import PropTypes from 'prop-types';

const ButtonPosition = 
{
    CENTER:     'center-block justify-content-center',
    RIGHT:      'align-items-end flex-column'
} 

function DrawButton(text, redirectLink, action, extraClass)
{
  var drawButton = () => 
  { 
    const classToUse = `chat-button ${extraClass}`;
    return <button onClick={action} className={classToUse}>{text}</button>
  };
  if (redirectLink)
  {
    return <a href={redirectLink} className="full-width">{drawButton()}</a>;
  }
  return drawButton();
}

class ChatButton extends React.Component 
{
  render () 
  {    
    const { text, redirectLink, action, extraClass, position } = this.props;
    const fullClass =`row font-weight-black ${position}`;
    return (
    <div className={fullClass}>
        {DrawButton(text, redirectLink, action, extraClass)}
    </div>
    );
  }
}

ChatButton.defaultProps =
{
  position: ButtonPosition.CENTER,
  action: event => { }
}

ChatButton.propTypes = 
{
  position: PropTypes.oneOf(Object.values(ButtonPosition)),
  text: PropTypes.string,
  redirectLink: PropTypes.string,
  extraClass: PropTypes.string,
  action: PropTypes.any
};

ChatButton.ButtonPosition = ButtonPosition
export default ChatButton