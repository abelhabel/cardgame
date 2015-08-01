class Card < ActiveRecord::Base

  def self.populate_card
    path = "app/data/cards/"
    puts File.directory?("app/data/cards")
    Dir.glob(path + '*.txt') do |file_path|
      # puts file_path
      file = File.open(file_path, "r").read
      puts file
      card = self.new(card_json: file)
      if card.save
        puts "file saved"
      else
        puts "failed to save"
      end
    end
    
  end


  def description
    parse("description")
  end

  def title
    parse("title")
  end

  def image
    parse("img")
  end

  def school
    parse("school")
  end

  private

  def parse(key)
    JSON.parse(self.card_json)[key]
  end

end