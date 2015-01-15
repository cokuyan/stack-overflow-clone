json.partial! "api/answers/answer", answer: @answer

json.author do
  json.id @answer.author.id
  json.username @answer.author.username
end

json.comments @answer.comments do |comment|
  json.partial! "api/comments/comment", comment: comment
end
