json.partial! "api/answers/answer", answer: @answer

json.author do
  json.id @answer.author.id
  json.username @answer.author.username
end
