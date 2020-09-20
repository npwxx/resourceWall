$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createBoardTileElement = function(board) {
    console.log(board);
    let $boardTile = $(`<article class="style1">
    <span class="image">
      <img src="images/pic01.jpg" alt="" />
    </span>
    <a href="generic.html">
      <h2>${escape(board.title)}</h2>
      <div class="content">
        <p>${escape(board.description)}</p>
      </div>
    </a>
  </article>`);
    return $boardTile;
  };
  const renderBoardTiles = function(boards) {
    $('.tiles').empty();
    for (let board of boards) {
      const $boardTile = createBoardTileElement(board);
      $('.tiles').prepend($boardTile);
    }
  };

  const loadBoards = function() {
    $.get("/boards")
      .then((boards) => {
        renderBoardTiles(boards);
      });
  };
  loadBoards();
});