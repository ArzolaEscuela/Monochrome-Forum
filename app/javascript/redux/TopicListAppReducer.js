import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Actions from './TopicListAppActions';
import swal from 'sweetalert';

const initialState = 
{
    isLoading: true,

    allTopics: [],
    
    newTopicName: "",
    newTopicDescription: "",
    newTopicAuthor: ""
}

function rootReducer(currentState, action) 
{
    switch(action.type)
    {
        case Actions.A_CREATE_NEW_TOPIC:
                currentState.allTopics.push(action.newTopic);  
            break;
        case Actions.A_DELETE_TOPIC:
                currentState.allTopics = currentState.allTopics.splice([action.indexInArray],1);  
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