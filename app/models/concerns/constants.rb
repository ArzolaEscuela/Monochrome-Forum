module Constants
    extend ActiveSupport::Concern

    # PAGES
    HOME_URL                                    = "/";
    
    FORUM_URL                                   = HOME_URL + "forum";

    # API
    API_URL                                     = HOME_URL + "api/";
    API_GET_ALL_FORUMS                          = API_URL + "get-all-forums";
    API_CREATE_NEW_FORUM                        = API_URL + "create-new-forum";
    API_DELETE_FORUM                            = API_URL + "delete-forum";
    API_SAVE_FORUM_CHANGES                      = API_URL + "save-forum-changes";
    API_GET_SPECIFIC_FORUM                      = API_URL + "get-specific-forum";
    API_GET_FORUM_COMMENTS                      = API_URL + "get-forum-contents";
    API_CREATE_NEW_COMMENT                      = API_URL + "create-new-comment";
    API_DELETE_COMMENT                          = API_URL + "delete-comment";
    API_SAVE_COMMENT_CHANGES                    = API_URL + "save-comment-changes";
end
  