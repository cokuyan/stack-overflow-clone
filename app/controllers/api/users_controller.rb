class Api::UsersController < ApplicationController
  def index
    if params[:sort] && params[:sort] != "username"
      sort = { params[:sort] => :desc }
    else
      sort = "username"
    end
    @users = User.order(sort).page(params[:page])
    render :index
  end

  def show
    @user = User
              .includes(questions: :tags, answered_questions: [:author, :tags], favorite_questions: [:author, :tags])
              .find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      msg = UserMailer.welcome_email(@user)
      msg.deliver
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    @user = User
              .includes(questions: :tags, answered_questions: [:author, :tags])
              .find(current_user.id)
    if @user.update(user_params)
      render :show
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :image)
  end
end
