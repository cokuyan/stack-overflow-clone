Rails.application.routes.draw do
  concern :paginatable do
    get '(page/:page)', action: :index, on: :collection, as: ''
  end

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
    resources :questions, concerns: :paginatable do
      get 'unanswered(/page/:page)', on: :collection, to: 'questions#unanswered'
      get 'favorite', on: :member
      delete 'unfavorite', on: :member
    end
    resources :users, concerns: :paginatable
    resources :answers
    resources :comments
    resources :votes, only: :create
    resources :tags, only: [:index, :show], concerns: :paginatable
    resource :session
  end

end
