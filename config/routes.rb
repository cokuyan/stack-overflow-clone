Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users
  resources :questions do
    resources :answers, only: [:new]
  end
  resources :answers, only: [:create, :edit, :update, :destroy] do
    get 'accept', on: :member
  end
  resources :votes, only: [:create]

  get '/login', to: 'sessions#new'
  resource :session, only: [:create, :destroy]
end
