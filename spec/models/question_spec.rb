require 'rails_helper'

RSpec.describe Question, :type => :model do
  describe "validations" do
    subject { build(:question) }

    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:content) }
    it { is_expected.to validate_presence_of(:author_id) }
    it { is_expected.to validate_presence_of(:view_count) }
  end

  describe "associations" do
    subject { build(:question) }

    it { is_expected.to belong_to(:author).class_name('User') }
    it { is_expected.to have_many(:answers) }
    it { is_expected.to have_many(:votes) }
  end
end
