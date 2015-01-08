require 'rails_helper'

RSpec.describe Vote, :type => :model do
  describe "validations" do
    subject { build(:vote) }

    it { is_expected.to validate_presence_of(:user_id) }
    it { is_expected.to validate_presence_of(:votable_id) }
    it { is_expected.to validate_presence_of(:votable_type) }

    it { is_expected.to validate_uniqueness_of(:user_id).scoped_to(:votable) }
  end
end
