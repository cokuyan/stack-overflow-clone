json.users do
  json.partial! "api/users/user", collection: @users, as: :user
end

json.page params[:page].to_i
json.total_pages @users.total_pages
