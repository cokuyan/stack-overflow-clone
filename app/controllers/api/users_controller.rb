class Api::UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    @user = User.includes(questions: :tags, answered_questions: [:author, :tags])
      .find(params[:id])
    render :show
  end

  # def create
  #   @user = User.new(user_params)
  #   unless params[:user][:password] == params[:user][:password_confirmation]
  #     render json: "Password and confirmation do not match",
  #            status: :unprocessable_entity
  #     return
  #   end
  #   if @user.save
  #     msg = UserMailer.welcome_email(@user)
  #     msg.deliver
  #     flash.now[:notice] = activation_message
  #     render json: @user
  #   else
  #     render json: @user.errors.full_messages, status: :unprocessable_entity
  #   end
  # end

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

  def activation_message
    <<-HEREDOC
    Welcome, #{@user.username}!
    In order to start using the site, please activate your account by following the link sent to your email.

    Or just click the following link for now:
    #{activate_users_url(activation_token: @user.activation_token)}
    HEREDOC
  end
end
