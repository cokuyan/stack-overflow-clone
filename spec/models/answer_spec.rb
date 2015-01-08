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
    it { is_expected.to have_many(:votes) }
  end

  # describe "#vote_count" do
  #   subject { build(:answer) }
  #
  #   context "has up votes" do
  #     before do
  #       Vote.create(
  #         vote_type: 'up',
  #         user_id: 1,
  #         votable_id: subject.id,
  #         votable_type: 'Answer'
  #       )
  #       Vote.create(
  #         vote_type: 'up',
  #         user_id: 2,
  #         votable_id: subject.id,
  #         votable_type: 'Answer'
  #       )
  #     end
  #
  #     it "is expected to have the correct number of votes" do
  #       expect(subject.vote_count).to eq(2)
  #     end
  #   end
  #
  #   context "has down votes" do
  #     before do
  #       Vote.create(
  #         vote_type: 'down',
  #         user_id: 1,
  #         votable_id: subject.id,
  #         votable_type: 'Answer'
  #       )
  #       Vote.create(
  #         vote_type: 'down',
  #         user_id: 2,
  #         votable_id: subject.id,
  #         votable_type: 'Answer'
  #       )
  #     end
  #
  #     it "is expected to have the correct number of votes" do
  #       expect(subject.vote_count).to eq(-2)
  #     end
  #   end
  #
  #   context "has mixed votes" do
  #     before do
  #       Vote.create(
  #         vote_type: 'up',
  #         user_id: 1,
  #         votable_id: subject.id,
  #         votable_type: 'Answer'
  #       )
  #       Vote.create(
  #         vote_type: 'down',
  #         user_id: 2,
  #         votable_id: subject.id,
  #         votable_type: 'Answer'
  #       )
  #     end
  #
  #     it "is expected to subtract correctly" do
  #       expect(subject.vote_count).to eq(0)
  #     end
  #   end

  end
end
