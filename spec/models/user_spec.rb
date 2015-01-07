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

  describe "methods" do
    subject { create(:user) }

    context "::find_by_credentials" do
      it "finds user based on email and password" do
        user = User.find_by_credentials(subject.email, 'password')
        expect(user).to eq(subject)
      end

      it "finds user based on username and " do
        user = User.find_by_credentials(subject.username, 'password')
        expect(user).to eq(subject)
      end
    end

    context "::generate_token" do
      it "generates a random string" do
        string1 = User.generate_token
        string2 = User.generate_token
        expect(string1).to_not eq(string2)
      end
    end

    context "#reset_session_token!" do
      it "resets the user's session token" do
        old_session_token = subject.session_token
        subject.reset_session_token!
        expect(old_session_token).to_not eq(subject.session_token)
      end
    end

    context "#password=" do
      it "sets the user's password digest" do
        user = User.new(password: 'password')
        expect(user.password_digest).to_not be_nil
      end
    end

    context "#is_password?" do
      it "checks if password is the correct password" do
        user = User.new(password: 'password')
        expect(user.is_password?('password')).to be true
      end
    end

  end

end
