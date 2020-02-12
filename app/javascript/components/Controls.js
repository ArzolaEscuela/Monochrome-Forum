import React from "react"
import PropTypes from 'prop-types';
import ChatButton from '../components/ChatButton';
import { connect } from 'react-redux';
import { GetMessages, SendMessage, ChangeText, ChangeName } from '../redux/AppActions'

class Controls extends React.Component 
{
    OnNameChanged(e)
    {
        this.props.ChangeName(e.target.value)
    }

    OnTextChanged(e)
    {
        this.props.ChangeText(e.target.value)
    }

    SendNewMessage(e)
    {
        const { name, text } = this.props;
        this.props.SendMessage(name, text);
    }

    RefreshMessages(e)
    {
        this.props.GetMessages();
    }

    render () 
    { 
        let { name, text } = this.props;

        return (
            <div className="container">

                <div className="row container-fluid justify-content-center align-center">            
                    <div className="form-group col-3 text-center">
                        <label>Forum Name</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe" value={name} onChange={this.OnNameChanged.bind(this)}/>
                    </div>
                    <div className="form-group col-8 text-center">
                        <label>Message</label>
                        <input type="text" className="form-control" id="message" placeholder="Hello World. (Yea, I'm just THAT original.)" value={text} onChange={this.OnTextChanged.bind(this)}/>
                    </div>
                </div>

                <div className="row"> 
                        <ChatButton text="Send New Message"/>
                </div>

            </div>
        );
    }
}

Controls.defaultProps = 
{
    name: "",
    text: ""
}

Controls.propTypes = 
{
    name: PropTypes.string,
    text: PropTypes.string
};

function mapStateToProps(state) 
{
    const { allMessages, name, text } = state
 
     return {
         allMessages: allMessages,
         name: name,
         text: text
     }; 
}

export default connect(mapStateToProps, {GetMessages: GetMessages, SendMessage: SendMessage, ChangeName: ChangeName, ChangeText: ChangeText })(Controls);