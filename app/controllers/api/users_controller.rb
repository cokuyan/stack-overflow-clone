class Api::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    @user = User.includes(:questions, answered_questions: :author)
      .find(params[:id])
    render :show
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
    params.require(:user).permit(:username, :email, :password)
  end
end
