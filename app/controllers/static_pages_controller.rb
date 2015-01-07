class StaticPagesController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:name_or_email],
      params[:user][:password]
    )
    if @user
      login!(@user)
      flash[:notice] = "Logged in successfully"
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
