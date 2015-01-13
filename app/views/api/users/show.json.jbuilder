json.extract! @user, :id, :username, :email
json.image_url asset_path(post.image.url)

json.questions @user.questions do |question|
  json.partial! "api/questions/question", question: question

  json.author do
    json.id @user.id
    json.username @user.username
  end

  json.tags question.tags do |tag|
    json.extract! tag, :id, :tag_name
  end
end

json.answered_questions @user.answered_questions do |answered_question|
  json.partial! "api/questions/question",
    question: answered_question,
    as: :answered_question

  json.author do
    json.id answered_question.author.id
    json.username answered_question.author.username
  end

  json.tags answered_question.tags do |tag|
    json.extract! tag, :id, :tag_name
  end
end
