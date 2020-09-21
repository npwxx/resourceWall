$(document).ready(function() {
  const router = new Navigo(null, true);

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
    '/myBoards': function() {
      console.log("Add route to DB");
    },
    '/likedResources': function() {
      console.log("add modal here");
    },
    '/profile': function() {
      console.log("add modal here");
    },
    '/logout': function() {
      console.log("redirect to home");
    }
  }).resolve();
});