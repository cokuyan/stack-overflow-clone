Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users
  get '/login', to: 'sessions#new'
  resource :session, only: [:create, :destroy]
end
