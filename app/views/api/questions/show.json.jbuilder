json.partial! "api/questions/question", question: @question

json.author do
  json.id @question.author.id
  json.username @question.author.username
end

json.answers @question.answers do |answer|
  json.partial! "api/answers/answer", answer: answer

  json.author do
    json.id answer.author.id
    json.username answer.author.username
  end

  json.comments answer.comments do |comment|
    json.(comment, :content, :created_at, :updated_at)

    json.author do
      json.id comment.author.id
      json.username comment.author.username
    end
  end

end

json.tags @question.tags do |tag|
  json.extract! tag, :id, :tag_name
end

json.comments @question.comments do |comment|
  json.(comment, :content, :created_at, :updated_at)

  json.author do
    json.id comment.author.id
    json.username comment.author.username
  end
end
