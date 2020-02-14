include Constants

Rails.application.routes.draw do

  # PUBLIC
  root "pages#home"
  get 'pages/home'
  get FORUM_URL, to: 'pages#forum'
  
  # API
  get API_GET_ALL_FORUMS, to: "api#get_all_forums"

  get '*path' => redirect('/') # When in doubt, redirect to root
end
