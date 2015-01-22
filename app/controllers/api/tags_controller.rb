class Api::TagsController < ApplicationController
  def index
    if params[:sort] && params[:sort] != "tag_name"
      sort = { params[:sort] => :desc }
    else
      sort = "tag_name"
    end
    tags = Tag.order(sort).page(params[:page])
    render json: {
                   tags: tags,
                   page: params[:page].to_i,
                   total_pages: tags.total_pages
                 }
  end

  def show
    @tag = Tag.includes(questions: [:author, :tags]).find(params[:id])
    render :show
  end
end
