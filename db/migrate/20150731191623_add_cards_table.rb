class AddCardsTable < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string                  :card_json
      t.integer                 :times_picked, default: 0
      t.integer                 :times_in_winning_deck, default: 0
      t.integer                 :times_in_losing_deck, default: 0
      t.timestamps
    end
  end
end
