json.extract! @tag, :id, :tag_name, :description

json.questions @tag.questions do |question|
  json.extract! question, :id, :title, :content, :view_count, :answered

  json.author do
    json.id question.author.id
    json.username question.author.username
  end

  json.tags question.tags do |tag|
    json.extract! tag, :id, :tag_name
  end
end
