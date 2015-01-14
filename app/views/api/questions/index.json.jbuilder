json.questions do
  json.partial! "api/questions/question", collection: @questions, as: :question
end

json.page params[:page]
json.total_pages @questions.total_pages
