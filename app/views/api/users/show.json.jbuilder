json.extract! @user, :id, :username, :email

json.questions @user.questions do |question|
  json.extract! question,
    :id,
    :title,
    :content,
    :view_count,
    :answered,
    :answers_count,
    :vote_count

  json.author do
    json.id @user.id
    json.username @user.username
  end

  json.tags question.tags do |tag|
    json.extract! tag, :id, :tag_name
  end
end

json.answered_questions @user.answered_questions do |answered_question|
  json.extract! answered_question,
    :id,
    :title,
    :content,
    :view_count,
    :answered,
    :answers_count,
    :vote_count

  json.author do
    json.id answered_question.author.id
    json.username answered_question.author.username
  end

  json.tags answered_question.tags do |tag|
    json.extract! tag, :id, :tag_name
  end
end
