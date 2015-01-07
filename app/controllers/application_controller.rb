class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
    return nil unless session[:session_token]
    user = User.find_by_session_token(session[:session_token])
    @current_user ||= user
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_current_user!
    unless logged_in?
      flash[:notice] = "You must be logged in to access that page!"
      redirect_to login_url
    end
  end

end
