import React from "react"
import PropTypes from 'prop-types';
import ChatButton from '../ChatButton';
import { connect } from 'react-redux';

class CreateMessageControls extends React.Component 
{

    render () 
    { 
        let { name, text } = this.props;
        
        // onChange={this.OnNameChanged.bind(this)}
        
        return (
            <div className="container">

                <div className="row container-fluid justify-content-center align-center">            
                    <div className="form-group col-3 text-center">
                        <label>Forum Name</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe" value={name}/>
                    </div>
                    <div className="form-group col-8 text-center">
                        <label>Message</label>
                        <input type="text" className="form-control" id="message" placeholder="Hello World. (Yea, I'm just THAT original.)" value={text}/>
                    </div>
                </div>

                <div className="row"> 
                        <ChatButton text="Create New Comment"/>
                </div>

            </div>
        );
    }
}

CreateMessageControls.defaultProps = 
{
    name: "",
    text: ""
}

CreateMessageControls.propTypes = 
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

export default CreateMessageControls
// export default connect(mapStateToProps, {})(CreateMessageControls);