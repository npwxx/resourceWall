const loadMenu = function() {
  $.get('/users/me')
    .then((user) => {
      if (user) {
        $('#menu > .inner').html(`<h2>Menu</h2>
        <ul>
          <li><a href="/" data-navigo>Home</a></li>
          <li><a href="/myBoards" data-navigo>My Boards</a></li>
          <li><a href="/profile" data-navigo>Edit Profile</a></li>
          <li><a href="/logout" data-navigo>Logout</a></li>
        </ul>`);
      } else {
        $('#menu > .inner').html(`<h2>Menu</h2>
        <ul>
          <li><a href="/" data-navigo>Home</a></li>
          <li><a href="/login" data-navigo>Login</a></li>
          <li><a href="/register" data-navigo>Register</a></li>
        </ul>`);
      }
      router.updatePageLinks();
    });

};

