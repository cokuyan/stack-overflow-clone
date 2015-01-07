Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users
  get '/login', to: 'sessions#login'
  resource :session, only: [:destroy]
end
