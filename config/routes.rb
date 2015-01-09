Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users do
    get 'activate', on: :collection
  end
  resources :questions do
    resources :answers, only: [:new]
  end
  resources :answers, only: [:create, :edit, :update, :destroy] do
    get 'accept', on: :member
  end
  resources :votes, only: [:create]

  get '/login', to: 'sessions#new'
  resource :session, only: [:create, :destroy]

  # backbone stuff
  namespace :api, defaults: { format: :json } do
    resources :questions
    resources :users
    resources :answers
    resources :votes, only: :create
  end

end
