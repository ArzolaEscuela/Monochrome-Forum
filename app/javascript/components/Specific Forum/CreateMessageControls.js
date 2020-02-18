import React, {useState} from "react"
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addNewComment} from '../../redux/SpecificForumActions';

const CreateMessageControls = ({addNewComment}) => 
{
        let [ author, setAuthor ] = useState('');
        let [comment, setComment] = useState('')
        
        // onChange={this.OnNameChanged.bind(this)}
        const handleName = (e) => {
            setAuthor(e.target.value)
        }
        const handleComment = (e) => {
            setComment(e.target.value)
        }

        const postComment = () => {
            addNewComment(comment, author)
        }
        
        return (
            <div className="container">

                <div className="row container-fluid justify-content-center align-center">            
                    <div className="form-group col-3 text-center">
                        <label>Author</label>
                        <input type="text" className="form-control" id="name" placeholder="John Doe" value={author} onChange={handleName}/>
                    </div>
                    <div className="form-group col-8 text-center">
                        <label>Comment</label>
                        <input type="text" className="form-control" id="message" placeholder="Hello World. (Yea, I'm just THAT original.)" value={comment} onChange={handleComment}/>
                    </div>
                </div>

                <div className="row"> 
                        <button className='chat-button center-block justify-content-center' onClick={postComment}>Create New Comment</button>
                </div>

            </div>
        );
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

// export default CreateMessageControls
export default connect(null, {addNewComment})(CreateMessageControls);