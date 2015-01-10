json.extract! @question,
  :id,
  :title,
  :content,
  :view_count,
  :answered,
  :answers_count,
  :vote_count

json.author do
  json.id @question.author.id
  json.username @question.author.username
end

json.answers @question.answers do |answer|
  json.extract! answer,
    :id,
    :content,
    :accepted,
    :vote_count

  json.author do
    json.id answer.author.id
    json.username answer.author.username
  end

end

json.tags @question.tags do |tag|
  json.extract! tag, :id, :tag_name
end
