class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    # check password and confirmation match
    unless params[:user][:password] == params[:user][:password_confirmation]
      flash.now[:errors] = ["Password and confirmation do not match"]
      @user.password = nil
      render :new
      return
    end
    # will implement activation later
    if @user.save
      flash[:notice] = "Welcome, #{@user.username}"
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      flash[:notice] = "Edited successfully"
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    flash[:notice] = "#{@user.username} removed successfully"
    redirect_to root_url
  end

  private

  def user_params
    # add activation_token?
    params.require(:user).permit(:username, :email, :password)
  end
end
