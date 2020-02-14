import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Actions from './TopicListAppActions';
import swal from 'sweetalert';

const initialState = 
{
    isLoading: true,

    allTopics: [],
    topicEditState: [],
    
    newTopicName: "",
    newTopicDescription: "",
    newTopicAuthor: "",

    changes: 0
}

function rootReducer(currentState, action) 
{
    switch(action.type)
    {
        case Actions.A_CREATE_NEW_TOPIC:
                currentState.allTopics.push(action.newTopic); 
                currentState.topicEditState.push(false); 
                currentState.newTopicName = "";
                currentState.newTopicDescription = "";  
                currentState.newTopicAuthor = "";  
            break;
        case Actions.A_TOGGLE_EDIT_TOPIC:
                currentState.topicEditState[action.indexToToggle] = !currentState.topicEditState[action.indexToToggle];
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_DELETE_TOPIC:
                currentState.allTopics = currentState.allTopics.splice([action.indexInArray],1);  
                currentState.topicEditState = currentState.topicEditState.splice([action.indexInArray],1); 
                currentState.changes++; // For some reason, splice doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_CHANGE_NEW_TOPIC_NAME:
                currentState.newTopicName = action.newTopicName;  
            break;
        case Actions.A_CHANGE_NEW_TOPIC_DESCRIPTION:
                currentState.newTopicDescription = action.newTopicDescription;  
            break;
        case Actions.A_CHANGE_NEW_TOPIC_AUTHOR:
                currentState.newTopicAuthor = action.newTopicAuthor;  
            break;
        case Actions.A_GET_TOPICS:
            currentState.allTopics = action.allTopics;  
            currentState.topicEditState = action.allTopics.map(item => false);
            break;
        case Actions.A_ASYNC_OPERATION_CANCELLED:
            // We only need to clean the isLoading flag, which is done outside the switch.
            break;
        case Actions.A_ASYNC_OPERATION_ERROR:
            swal('An error has ocurred performing this operation.',
            {
                icon: "error"
            });
            break;
        case Actions.A_ASYNC_OPERATION_STARTED:
            return {
                ...currentState,
                isLoading: true
            };
        default:
            return currentState;    
    }

    return {
        ...currentState,
        isLoading: false
    }
}

export default function TopicListAppReducer() {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    return store;
}