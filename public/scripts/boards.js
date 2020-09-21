const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createBoardTileElement = function(board) {
  console.log(board);
  let $boardTile = $(`<article class="style3">
  <span class="image">
  <img src="images/pic01.jpg" alt="" />
  </span>
  <a href="#">
  <h2>${escape(board.title)}</h2>
  <div class="content">
  <p>${escape(board.description)}</p>
  </div>
  </a>
  </article>`);
  $boardTile.click(() => {
    renderBoardPage(board);
  });
  return $boardTile;
};
const renderBoardTiles = function(boards) {
  $('.tiles').empty();
  for (let board of boards) {
    const $boardTile = createBoardTileElement(board);
    $('.tiles').prepend($boardTile);
  }
};
const renderBoardsLayout = function() {
  $('#main').html(`<div class="inner">
  <header>
    <h1>Boards</h1>
    <p>Do we want to write something here?? Or add a search spot?</p>
  </header>
  <section class="tiles">
  </section>
</div>`);
};

const renderBoardPage = function(board) {
  $('#main').html(`<div class="inner">
  <header>
    <h1>${escape(board.title)}</h1>
    <p>${escape(board.description)}</p>
  </header>
  <section class="tiles">
  </section>
</div>`);
};

const loadBoards = function() {
  $.get("/boards")
    .then((boards) => {
      renderBoardTiles(boards);
    });
};

$(document).ready(function() {
  renderBoardsLayout();
  loadBoards();
});