#require 'routes/game'
#require 'routes/player' 
require 'pry'

# Homepage (Root path)
get '/' do
  if session[:id]
    @user = User.find(session[:id])
    @user.logged_in = true
    @user.save
    erb :index
  else
    redirect '/signup'
  end
end

get '/login' do
  erb :login
end

post '/logout' do
  @user = User.find(session[:id])
  if @user.logged_in
    @user.update_attribute(:logged_in, false)
  else
    @user.update_attribute(:logged_in, true)
  end
end

post '/login' do
  @user = User.find_by(email: params[:email])
  if @user
    if(@user.authenticate(params[:password]))
      @user.logged_in = true
      @user.save
      session[:id] = @user.id
      erb :index
    else
      redirect ''
    end
  else
    @user = nil
    session[:id] = nil
    redirect ''
  end
end

get '/signup' do
  erb :signup
end

post '/signup' do
  @user = User.new(user_name: params[:user_name], email: params[:email], password: params[:password], password_confirmation: params[:password_confirmation])
  if @user.save
    session[:id] = @user.id
    @user.logged_in = true
    @user.save
    erb :index
  else
    puts @user.errors
    redirect ''
  end
end

post '/login_signup' do #login rename..

  @name = params[:name].strip
  @password = params[:password].strip
  @existing_player = Player.exists?(name: @name)
  if @existing_player
    @player = Player.find_by(name: @name)
    if @player.password == @password
      session[:id] = @player.id
    else
      @error = "Invalid Password!"
      session[:id] = nil
    end
  else
    @player = Player.new(name: @name, password: @password)
    @error = "Failed to create new player" if !@player.save
    session[:id] = @player.id
  end
  erb :index
end 
