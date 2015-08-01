$(document).ready(function() {
  $('#logout').click(logout);
  $('#login').click(login);
  function logout(e){
    jQuery.ajax('/logout', {
      data: 'logout=true',
      dataType: 'text',
      method: 'POST',
      success: function(){$('#logout').text("Log in")}
    })
  }
});
