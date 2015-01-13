class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.includes(questions: :tags, answered_questions: [:author, :tags])
      .find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    unless params[:user][:password] == params[:user][:password_confirmation]
      render json: "Password and confirmation do not match",
             status: :unprocessable_entity
      return
    end
    if @user.save
      msg = UserMailer.welcome_email(@user)
      msg.deliver
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :image)
  end
end
