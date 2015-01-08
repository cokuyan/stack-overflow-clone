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
  
  # describe "vote_count" do
  #   subject { create(:question) }
  #
  #   context "has up votes" do
  #     before do
  #       2.times do |n|
  #         create(:question_vote, user_id: n, votable_id: subject.id, vote_type: 'up')
  #       end
  #     end
  #
  #     it "is expected to have the correct number of votes" do
  #       expect(subject.vote_count).to eq(2)
  #     end
  #   end
  #
  #   context "has down votes" do
  #     before do
  #       2.times do |n|
  #         create(:question_vote, user_id: n, votable_id: subject.id, vote_type: 'down')
  #       end
  #     end
  #
  #     it "is expected to have the correct number of votes" do
  #       expect(subject.vote_count).to eq(-2)
  #     end
  #   end
  #
  #   context "has mixed votes" do
  #     before do
  #       create(:question_vote, user_id: 0, votable_id: subject.id, vote_type: 'up')
  #       create(:question_vote, user_id: 1, votable_id: subject.id, vote_type: 'down')
  #     end
  #
  #     it "is expected to subtract correctly" do
  #       expect(subject.vote_count).to eq(0)
  #     end
  #   end
  # end
end
