const router = new Navigo(null, true);
$(document).ready(function() {
  loadMenu();
  router.on({
    '*': function() {
      console.log('Homepage');
      renderMainPageLayout();
      loadBoards().then(() => {
        router.updatePageLinks();
      });
    },
    '/boards/:boardId': function(params) {
      loadBoard(Number(params.boardId));
    },
    '/login': function() {
      renderLoginModal();
    },
    '/register': function() {
      renderRegisterModal();
    },
    '/users/myBoards': function() {
      console.log("Add route to DB");
    },
    '/likedResources': function() {
      console.log("add page here");
    },
    '/profile': function() {
      renderProfilePage();
    },
    '/logout': function() {
      $.post('/users/logout').then(loadMenu)
        .then(() => router.navigate('/'));
    },
    '/myBoards': function() {
      loadMyBoard().then(() => {
        router.updatePageLinks();
      });
    }
  }).resolve();
});
