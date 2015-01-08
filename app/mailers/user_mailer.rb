class UserMailer < ActionMailer::Base
  default from: "notifications@stack-overflown.com"

  def welcome_email(user)
    @user = user
    mail(to: user.email, subject: 'Welcome to Stack Overflown!')
  end
end
