const createBoardTileElement = function(board) {
  //console.log(board);
  let $boardTile = $(`<article class="style3">
  <span class="image">
  <img src="images/pic01.jpg" alt="" />
  </span>
  <a href="/boards/${board.id}" data-navigo>
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
const renderMainPageLayout = function() {
  $('#main').html(`<div class="inner">
  <header>
    <h1>Boards</h1>
    <p>TODO: Add search bar & functionality</p>
  </header>
  <section class="tiles">
  </section>
</div>`);
};

//TODO: change to database query
const loadBoard = function(id) {
  $.get("/boards")
    .then((boards) => {
      renderBoardPage(boards.find(b => b.id === id));
    });
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
  return $.get("/boards")
    .then((boards) => {
      renderBoardTiles(boards);
    });
};
