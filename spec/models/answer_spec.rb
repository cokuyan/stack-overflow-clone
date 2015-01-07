require 'rails_helper'

RSpec.describe Answer, :type => :model do
  describe "validations" do
    subject { build(:answer) }

    it { is_expected.to validate_presence_of(:content) }
    it { is_expected.to validate_presence_of(:author_id) }
    it { is_expected.to validate_presence_of(:question_id) }

    it { is_expected.to validate_uniqueness_of(:author_id).scoped_to(:question_id) }
  end

  describe "associations" do
    subject { build(:answer) }

    it { is_expected.to belong_to(:author).class_name('User') }
    it { is_expected.to belong_to(:question) }
  end
end
