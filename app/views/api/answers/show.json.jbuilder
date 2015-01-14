json.partial! "api/answers/answer", answer: @answer

json.author do
  json.id @answer.author.id
  json.username @answer.author.username
end

json.comments @answer.comments do |comment|
  json.(comment, :content, :created_at, :updated_at)

  json.author do
    json.id comment.author.id
    json.username comment.author.username
  end
end
