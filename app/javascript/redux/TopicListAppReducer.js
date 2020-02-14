import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Actions from './TopicListAppActions';
import swal from 'sweetalert';
import _ from 'lodash';

const initialState = 
{
    isLoading: true,

    allTopics: [],
    editTopicStates: [],
    topicEditState: [],
    
    newTopicName: "",
    newTopicDescription: "",
    newTopicAuthor: "",

    changes: 0
}

function copy(aObject) {
    if (!aObject) {
      return aObject;
    }
  
    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? copy(v) : v;
    }
  
    return bObject;
  }

function rootReducer(currentState, action) 
{
    switch(action.type)
    {
        case Actions.A_CREATE_NEW_TOPIC:
                currentState.allTopics.push(action.newTopic);
                currentState.editTopicStates.push(action.newTopic);
                currentState.topicEditState.push(false); 
                currentState.newTopicName = "";
                currentState.newTopicDescription = "";  
                currentState.newTopicAuthor = "";  
                currentState.changes++; 
            break;
        case Actions.A_TOGGLE_EDIT_TOPIC:
                currentState.topicEditState[action.indexToToggle] = !currentState.topicEditState[action.indexToToggle];
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_SAVE_TOPIC_CHANGES:
                currentState.allTopics[action.arrayIndex]['forumName'] = action.newName;  
                currentState.allTopics[action.arrayIndex]['description'] = action.newDesc;
                currentState.allTopics[action.arrayIndex]['author'] = action.newAuth;
                currentState.topicEditState[action.arrayIndex] = false;
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_DELETE_TOPIC:
                currentState.allTopics.splice([action.indexInArray],1);  
                currentState.editTopicStates.splice([action.indexInArray],1);  
                currentState.topicEditState.splice([action.indexInArray],1); 
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
        case Actions.A_CHANGE_EXISTING_TOPIC_NAME:
                currentState.editTopicStates[action.arrayIndex]['forumName'] = action.newName;  
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_CHANGE_EXISTING_TOPIC_DESCRIPTION:
                currentState.editTopicStates[action.arrayIndex]['description'] = action.newDesc;
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_CHANGE_EXISTING_TOPIC_AUTHOR:
                currentState.editTopicStates[action.arrayIndex]['author'] = action.newAuth;  
                currentState.changes++; // For some reason, index manipulation doesn't count as dirtying the state, so we manually dirty it some other way
            break;
        case Actions.A_GET_TOPICS:
            currentState.allTopics = action.allTopics; 
            currentState.editTopicStates = _.cloneDeep(action.allTopics); // Clone array by value
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