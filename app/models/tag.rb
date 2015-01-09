class Tag < ActiveRecord::Base
  validates :tag_name, presence: true
  validates :tag_name, uniqueness: true

  has_many :taggings, dependent: :destroy
  has_many :questions, through: :taggings
end
