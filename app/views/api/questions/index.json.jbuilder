json.questions do
  json.partial! "api/questions/question", collection: @questions, as: :question
end

json.page params[:page].to_i
json.total_pages @questions.total_pages
