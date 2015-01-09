class Api::AnswersController < ApplicationController
  def create
    answer = current_user.answers.new(answer_params)
    if answer.save
      render json: answer
    else
      render json: answer.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:content, :question_id)
  end
end
