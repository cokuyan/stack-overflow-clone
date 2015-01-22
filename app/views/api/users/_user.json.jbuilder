json.(user, :id, :username, :email, :created_at, :questions_count, :answers_count, :favorite_question_ids)
json.image_url asset_path(user.image.url)
