json.(
  question,
  :id,
  :title,
  :content,
  :view_count,
  :answered,
  :answers_count,
  :vote_count,
  :created_at,
  :updated_at
)

json.author do
  json.id question.author.id
  json.username question.author.username
end
