json.(@comment, :content, :created_at, :updated_at)

json.author do
  json.id @comment.author.id
  json.username @comment.author.username
end
