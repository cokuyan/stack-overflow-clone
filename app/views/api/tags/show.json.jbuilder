json.extract! @tag, :id, :tag_name, :description

json.questions @tag.questions do |question|
  json.partial! "api/questions/question", question: question

  json.author do
    json.id question.author.id
    json.username question.author.username
  end

  json.tags question.tags do |tag|
    json.extract! tag, :id, :tag_name
  end
end
