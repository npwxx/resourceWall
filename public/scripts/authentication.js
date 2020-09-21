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

//TODO:
const renderProfilePage = function() {
  $("#main").html(`<div class="inner">
  <header>
    <h1>Edit Profile</h1>
    <p></p>
  </header>
  <section>
  <form id="profile-form" >
  <div class="row gtr-uniform">
  <div class="col-6 col-12-xsmall">
    <input type="text" name="demo-name" id="demo-name" value="" placeholder="Update Name" />
  </div>
  <div class="col-6 col-12-xsmall">
    <input type="email" name="demo-email" id="demo-email" value="" placeholder="Update Email" />
  </div>
  <div class="col-6 col-12-xsmall">
    <input type="password" name="password" id="password" value="" placeholder="Update Password" />
  </div>
  <div class="col-6 col-12-xsmall">
    <input type="password" name="password" id="password" value="" placeholder="Current Password" />
  </div>
  </div>
  </form>
  </section>
  </div>`);

};