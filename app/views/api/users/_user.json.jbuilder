json.(user, :id, :username, :email, :created_at, :questions_count, :answers_count)
json.image_url asset_path(user.image.url)
