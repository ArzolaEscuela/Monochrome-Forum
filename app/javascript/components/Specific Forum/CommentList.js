import React, {useEffect, useState} from "react"
import MessageArea from './MessageArea';
import CreateMessageControls from './CreateMessageControls';
import Header from '../Header';
import axios from 'axios';
import * as constants from "../../../../config/_constants";
import {Provider} from 'react-redux';
import SpecificForumReducer from '../../redux/SpecificForumReducer';

const store = SpecificForumReducer();

const CommentList = ()=>
{
  const [selectedForum, setSelectedForum] = useState({})
  useEffect(function(){
    function getForum(){
      axios.get(`${constants.API_GET_SPECIFIC_FORUM}?id=3`)
        .then(function(response)
        {
            setSelectedForum(response.data.data.selectedForum);
        })
        .catch((error) => {console.log(error)})
    }
    getForum()
  },[])

  if (Object.entries(selectedForum).length===0)
  {
    return <Header author={null} title="Please Select A Forum" description='In order to be able to proceed, please <u><a href="/">go back</a></u> and select a valid forum to visit.'/>;
  }

  const { forumName, description, author } = selectedForum

  return (
      <>

      <Header author={author} title={forumName} description={description}/>

      <br/>
      <Provider store={store}>
        <div className="container">
            <div className="chat-background">
            <br/>
                <div><CreateMessageControls/></div>
            <br/>
                <div><MessageArea id={3}/></div>
            </div>
        </div>
      </Provider>
      </>
  )
}

export default CommentList