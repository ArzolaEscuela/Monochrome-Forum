Rails.application.routes.draw do
  get 'pages/home'
  get "/forum", to: 'pages#forum'
  root "pages#home"
  get '*path' => redirect('/') # When in doubt, redirect to root
end
