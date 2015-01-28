class Api::SessionsController < ApplicationController
  def show
    @user = current_user
    logged_in? ? render(:show) : render(json: {})
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:name_or_email],
      params[:user][:password]
    )
    if @user && @user.activated?
      login!(@user)
      render :show
    elsif @user && !user.activated?
      render json: "Not activated", status: :unprocessable_entity
    else
      render json: "Invalid login", status: :unprocessable_entity
    end
  end

  def destroy
    user = current_user
    logout!
    render json: {}
    user.destroy if session[:demo]
    session[:demo] = false
  end
end
