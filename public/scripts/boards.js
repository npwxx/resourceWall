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
    $('.tiles').append($boardTile);
  }
};

const renderBoardResources = function(resources) {
  $('#resources').empty();
  for (const resource of resources) {
    const $resourcelink = $('<li/>', {
      text: resource.title
    }).appendTo('#resources');
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
  $.get(`/boards/${id}`)
    .then((boards) => {
      // console.log(boards);
      renderBoardPage(boards[0]);
    }).then(() => {
      return $.get(`/boards/${id}/resources`);
    }).then((/*resources*/) => {
      const resources = [{ "title": "GMLAN", "description": "In hac habitasse platea dictumst. E", "link": "https://apache.org/n", "average_rating": "5.00" }, { "title": "Electricity", "description": "In hac habitasse platea dictumst. M", "link": "https://weibo.com/ul", "average_rating": "4.75" }, { "title": "Childcare", "description": "Vestibulum quam sapien, varius ut, ", "link": "http://webmd.com/ant", "average_rating": "4.67" }, { "title": "Nonprofits", "description": "Aenean lectus. Pellentesque eget nu", "link": "https://simplemachin", "average_rating": "4.50" }, { "title": "Wufoo", "description": "Sed ante. Vivamus tortor. Duis matt", "link": "https://google.com.h", "average_rating": "4.50" }, { "title": "LMS Test.Lab", "description": "Cras mi pede, malesuada in, imperdi", "link": "http://nymag.com/in/", "average_rating": "4.50" }];
      renderBoardResources(resources);
    });
};

const renderBoardPage = function(board) {
  $('#main').html(`<div class="inner">
  <header>
    <h1>${escape(board.title)}</h1>
    <p>${escape(board.description)}</p>
  </header>
  <section>
  <h2>Resources</h2>  
    <ul id="resources">
    </ul>
  </section>
</div>`);
};

const loadBoards = function() {
  return $.get("/boards")
    .then((boards) => {
      renderBoardTiles(boards);
    });
};
