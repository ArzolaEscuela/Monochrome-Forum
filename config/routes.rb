include Constants

Rails.application.routes.draw do

  # PUBLIC
  root "pages#home"
  get 'pages/home'
  get FORUM_URL, to: 'pages#forum'
  
  # API
  get API_GET_ALL_FORUMS,           to: "api#get_all_forums"
  get API_GET_SPECIFIC_FORUM,       to: "api#get_specific_forum"
  get API_GET_FORUM_COMMENTS,       to: "api#get_forum_comments"
  post API_CREATE_NEW_FORUM,        to: "api#create_new_forum"
  post API_DELETE_FORUM,            to: "api#delete_forum"
  post API_SAVE_FORUM_CHANGES,      to: "api#save_forum_changes"
  post API_CREATE_NEW_COMMENT,      to: "api#create_new_comment"
  
  get '*path' => redirect('/') # When in doubt, redirect to root
end
