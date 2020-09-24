const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const userAuthenticate = (userId) => {
  const currentUser = req.session.userId;
  return currentUser === userId;
};

const loadBoards = function() {
  return $.get("/boards")
    .then((boards) => {
      console.log("util-functions ", boards);
      renderBoardTiles({ boards });
      router.updatePageLinks();
    });
};

(function($) {
  $.fn.serializeFormJSON = function() {
    let o = {};
    let a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };
})(jQuery);