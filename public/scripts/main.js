// MAIN PAGE FUNCTION

const renderMainPageLayout = function() {
  renderMainBoards();
  renderMainResources();
  loadTopResources();
  // console.log("this");
};

const renderMainBoards = function() {
  $('#main').html(`<div class="inner">
    <div class='board-search'>
    <header class='board-header'>
      <h1>Top Boards</h1>
    </header>
    <section class="tiles">
    </section>
    </div>`);
  const $searchBoards = $(`
    <form class= 'board-category-search' >
      <input type='text' placeholder='Search Categories'></input>
      <button type='submit'><i class='fa fa-search'></i></button>
    </form > `).appendTo('.board-header');
  $searchBoards.submit(handleBoardSearch);
};

const handleBoardSearch = function(event) {
  event.preventDefault();
  const serializedData = $(this).serialize();
  return $.get("/boards")
    .then((boards) => {
      renderMainBoards(boards);
    });
};

// const renderMainResources = function() {
//   $('#main').append(`<div class="inner">
//   <div class='resource-search'>
//   <header class='resource-header'>
//     <h1>Top Resources</h1>
//   </header>
//   <section id="resources">
//   </section>
//   </div>
//   </div>`);
//   const $searchResources = $(`
//   <form class='resource-category-search'>
//     <input type='text' placeholder='Search Categories'></input>
//     <button type='submit'><i class='fa fa-search'></i></button>
//   </form>`).appendTo('.resource-header');
//   $searchResources.submit(handleResourceSearch);
// };

const renderMainResources = function() {
  $('#main').append(`<div class="inner">
  <div class='resource-search'>
  <header class='resource-header'>
    <h1>Top Resources</h1>
  </header>
  <section id="resources">
  </section>
  </div>
  </div>`);
  const $searchResources = $(`
  <div>
  </div>`).appendTo('.resource-header');
  $(`<button class='button-primary'>Highest Rated</button>`)
    .click(handleResourceByRating).appendTo($searchResources);
  $(`<button type='submit' class='most-saved button-primary'>Newest</button>`)
    .click(handleResourceByNewest).appendTo($searchResources);
  $(`<button type='submit' class='most-liked button-primary'>Most Liked</button>`)
    .click(handleResourceByLikes).appendTo($searchResources);
  $(`<button type='submit' class='most-comments button-primary'>Most Commented</button>`)
    .click(handleResourceByComments).appendTo($searchResources);
};
const handleResourceByRating = function(event) {
  event.preventDefault();
  const serializedData = $(this).serialize();
  $.get(`/resources/ratings-descending`)
    .then((resources) => {
      renderBoardResources(resources);
    });
};

const handleResourceByNewest = function(event) {
  event.preventDefault();
  const serializedData = $(this).serialize();
  $.get(`/resources/sort-newest`)
    .then((resources) => {
      renderBoardResources(resources);
    });
};

const handleResourceByLikes = function(event) {
  event.preventDefault();
  const serializedData = $(this).serialize();
  $.get(`/resources/most-liked`)
    .then((resources) => {
      renderBoardResources(resources);
    });
};

const handleResourceByComments = function(event) {
  event.preventDefault();
  const serializedData = $(this).serialize();
  $.get(`/resources/most-commented`)
    .then((resources) => {
      renderBoardResources(resources);
    });
  console.log('this');
};

const loadTopResources = function() {
  return $.get("/resources/ratings-descending")
    .then((resources) => {
      renderBoardResources(resources);
    });
};
