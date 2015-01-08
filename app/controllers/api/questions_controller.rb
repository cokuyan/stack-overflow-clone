class Api::QuestionsController < ApplicationController
  def index
    render json: Question.all
  end
end
