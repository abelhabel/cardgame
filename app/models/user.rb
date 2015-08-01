class User < ActiveRecord::Base
  has_secure_password
  validates :email, uniqueness: true
  validates :user_name, presence: true
  validates :email, presence: true
  validates :password, presence: true
end