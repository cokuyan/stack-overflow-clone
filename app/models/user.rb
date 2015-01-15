class User < ActiveRecord::Base
  attr_reader :password

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :username,
    :email,
    :password_digest,
    :session_token,
    :activation_token,
    presence: true
  validates :activated, :admin, inclusion: [true, false]
  validates :username,
    :email,
    :password_digest,
    :session_token,
    :activation_token,
    uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password, confirmation: true
  validate :password_confirmation_not_blank
  # email pattern validation?
  # username format validation?
  after_initialize :ensure_session_token,
    :ensure_activation_token,
    :ensure_not_activated,
    :ensure_not_admin

  has_many :questions,
    class_name: 'Question',
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :author

  has_many :answers,
    class_name: 'Answer',
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :author

  has_many :answered_questions, through: :answers, source: :question

  has_many :votes

  has_many :comments,
    class_name: 'Comment',
    foreign_key: :author_id,
    inverse_of: :author

  has_many :favorites
  has_many :favorite_questions, through: :favorites, source: :question

  def self.find_by_credentials(name_or_email, password)
    user = User.includes(:favorite_questions).find_by_username(name_or_email) ||
           User.includes(:favorite_questions).find_by_email(name_or_email)
    user.try(:is_password?, password) ? user : nil
  end

  def self.generate_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = User.generate_token
    self.save!
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  # TODO: ensure unique
  def ensure_session_token
    self.session_token ||= User.generate_token
  end

  # TODO: ensure unique
  def ensure_activation_token
    self.activation_token ||= User.generate_token
  end

  def ensure_not_activated
    self.activated ||= false
  end

  def ensure_not_admin
    self.activated ||= false
  end

  def password_confirmation_not_blank
    if !self.persisted? && self.password_confirmation.blank?
      errors[:password_confirmation] = "can't be blank"
    end
  end
end
