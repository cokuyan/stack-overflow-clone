class Api::AnswersController < ApplicationController
  def show
    @answer = Answer.includes(:author, comments: :author).find(params[:id])
  end

  def create
    unless logged_in?
      render json: "must be logged in", status: :unprocessable_entity
      return
    end
    @answer = current_user.answers.new(answer_params)
    if @answer.save
      render :show
    else
      render json: @answer.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @answer = Answer.includes(:author).find(params[:id])
    if @answer.update(answer_params)
      render :show
    else
      render json: @answer.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    answer = current_user.answers.find(params[:id])
    if answer.vote_count < 1
      answer.destroy
      render json: answer
    else
      render json: "Cannot delete answer", status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:content, :question_id, :accepted)
  end
end
