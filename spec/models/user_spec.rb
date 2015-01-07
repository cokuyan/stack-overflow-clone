require 'rails_helper'
require 'spec_helper'

RSpec.describe User, :type => :model do
  describe "validations" do
    subject { build(:user) }
    # presence validations
    it { is_expected.to validate_presence_of(:username) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password_digest) }
    it { is_expected.to validate_presence_of(:session_token) }
    it { is_expected.to validate_presence_of(:activation_token) }

    # uniqueness validations
    it { is_expected.to validate_uniqueness_of(:username) }
    it { is_expected.to validate_uniqueness_of(:email) }
    it { is_expected.to validate_uniqueness_of(:password_digest) }
    it { is_expected.to validate_uniqueness_of(:session_token) }
    it { is_expected.to validate_uniqueness_of(:activation_token) }

    # password length validation
    it { is_expected.to ensure_length_of(:password).is_at_least(6) }

    # boolean validations
    it "defaults to not be activated" do
      expect(subject.activated).to be false
    end

    it "defaults to not be admin" do
      expect(subject.admin).to be false
    end

    it "does not reset activated if activated" do
      expect(build(:activated_user).activated).to be true
    end

    it "does not reset admin if admin" do
      expect(build(:admin).admin).to be true
    end
  end
end
