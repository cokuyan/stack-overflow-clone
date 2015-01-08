class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    # TODO: figure out how to set username or email when rerendering
    # new form
    @user = User.find_by_credentials(
      params[:user][:name_or_email],
      params[:user][:password]
    )
    if @user && @user.activated?
      login!(@user)
      flash[:notice] = "Logged in successfully"
      redirect_to root_url
    elsif @user && !@user.activated?
      flash[:notice] = "Please check your email to activate your account"
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid username/email and password combination"]
      render :new
    end
  end

  def destroy
    logout!
    flash[:notice] = "Logged out successfully"
    redirect_to root_url
  end
end
