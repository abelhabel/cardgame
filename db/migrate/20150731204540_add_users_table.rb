class AddUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string      :user_name
      t.string      :password
      t.string      :password_digest
      t.string      :email
      t.integer     :ranking, default: 1200
      t.integer     :games_won, default: 0
      t.integer     :games_lost, default: 0
      t.integer     :games_drawn, default: 0
      t.boolean     :can_create_card, default: false   
    end
  end
end
