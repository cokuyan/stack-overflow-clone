json.extract! @answer,
  :id,
  :content,
  :accepted,
  :vote_count

json.author do
  json.id @answer.author.id
  json.username @answer.author.username
end
