import React from "react"

import ForumsArea from './ForumsArea';
import CreateForumsControls from './CreateForumControls';

import { Provider } from 'react-redux';
import TopicListAppReducer from '../../redux/TopicListAppReducer';
const store = TopicListAppReducer();

class ForumList extends React.Component 
{
  render () 
  { 
    return (
      <Provider store={store}>

        <CreateForumsControls/>
        <br/>
        <ForumsArea/>

        </Provider>
    );
  }
}

export default ForumList