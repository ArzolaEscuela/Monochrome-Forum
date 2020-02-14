import React from "react"
import PropTypes from 'prop-types';

import Forum from './Forum';
import Header from '../Header';

import { connect } from 'react-redux';
import { GetAllTopics } from '../../redux/TopicListAppActions';

function DrawContents(allTopics, editState)
{
    return allTopics.map((entry, id) => 
    {
        return <span key={id}>
            <Forum info={entry} editState={editState[id]} editIndex={id}/>
        </span>
    });
}

class ForumsArea extends React.Component 
{
    componentDidMount()
    {
        this.props.GetAllTopics();
    }

    render () 
    { 
        const { allTopics, topicEditState } = this.props;

        if (allTopics.length == 0)
        {
            return <Header author={null} title="There are no forums." description="Please create a new forum using the controls above."/>;
        }

        return (
            <div className="container background">            
                <div className="row justify-content-center text-center">
                    <div className="col-11 ">
                        <div className="row">
                            <div className="col-3 forum-header">
                                Forum Name:            
                            </div>
                            <div className="col-5 forum-header">
                                Description:
                            </div>
                            <div className="col-2 forum-header">
                                Created At:
                            </div>
                            <div className="col-2 forum-header">
                                Controls:
                            </div>
                        </div>   
                        
                        {DrawContents(allTopics, topicEditState)}
                    </div>
                </div>  
                <br/>             
            </div>
        );
    }
}

ForumsArea.defaultProps = 
{
    allTopics: []
}

ForumsArea.propTypes = 
{
    allTopics: PropTypes.any
};

function mapStateToProps(state) 
{
   const { allTopics, topicEditState } = state

    return {
        ...state,
        allTopics: allTopics,
        topicEditState: topicEditState
    }; 
}

export default connect(mapStateToProps, {GetAllTopics})(ForumsArea);