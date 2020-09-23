//base function for modal form
//TODO: add input & POST request to DB
const renderLoginModal = function() {
  $("#modal-container").html('<h3>Login</h3>');
  const $form = $(`
    <form>
      <div>
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div>
        <input type="password" name="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `);
  $form.appendTo('#modal-container');
  $form.submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    //submit data to the server
    $.post("/login", serializedData)
      .then(() => {
        // TODO: Check if login wa ssucessful & then close modal & mavigate to my boards
      });
  });
  $('#modal-container').modal();
};

//base function for modal form
//TODO: add input & POST request to DB
const renderRegisterModal = function() {
  $("#modal-container").html(`
  <h3>Create Account</h3>`);
  const $form = $(`
    <form>
      <input type="text" name="name" placeholder="Name">
      <input type="email" name="email" placeholder="email">
      <input type="password" name="password" placeholder="password">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `);
  $form.appendTo('#modal-container');
  $form.submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.ajax({type: "POST", url: "/users/register", data: serializedData})
    .then(() => {
      $.modal.close();
      renderProfilePage();
    })
    .fail((error) => {
      console.log("Error with registration", error)
    })
  });
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
