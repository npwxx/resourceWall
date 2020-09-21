//base function for modal form
//TODO: add input & POST request to DB
const renderLoginModal = function() {
  $("#modal-container").html(`<form id="login-form">
  login
</form>`);
  $('#modal-container').modal();
};

//base function for modal form
//TODO: add input & POST request to DB
const renderRegisterModal = function() {
  $("#modal-container").html(`<form id="register-form">
  register
</form>`);
  $('#modal-container').modal();
};