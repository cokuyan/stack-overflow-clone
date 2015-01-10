class Api::TagsController < ApplicationController
  def index
    tags = Tag.all
    render json: tags
  end

  def show
    @tag = Tag.includes(questions: [:author, :tags]).find(params[:id])
    render :show
  end
end
