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

  def ensure_current_user
    redirect_to login_url unless logged_in?
  end

end
