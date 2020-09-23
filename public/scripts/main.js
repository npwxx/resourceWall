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
  <form class='resource-category-search'>
    <input type='text' placeholder='Search Categories'></input>
    <button type='submit'><i class='fa fa-search'></i></button>
  </form>`).appendTo('.resource-header');
  $searchResources.submit(handleResourceSearch);
};

const handleResourceSearch = function(event) {

};

const loadTopResources = function() {
  return $.get("/resources/ratings-descending")
    .then((resources) => {
      renderBoardResources(resources);
    });
};
