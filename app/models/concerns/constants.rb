module Constants
    extend ActiveSupport::Concern

    # PAGES
    HOME_URL                                    = "/";
    
    FORUM_URL                                   = HOME_URL + "forum";

    # API
    API_URL                                     = HOME_URL + "api/";
    API_GET_ALL_FORUMS                          = API_URL + "get-all-forums";
end
  