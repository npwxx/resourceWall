
const categoriesElement = function() {
  return $(`
  <div class="col-6 col-12-small">
	  <input type="checkbox" id="demo-copy" name="demo-copy">
	  <label for="demo-copy">Email me a copy</label>
  </div>`);
};


const createBoardFormElement = function() {
  return $('<section/>').append(
    $('<h2/>', { text: "Create New Board" })
  ).append(
    $('<form/>', {
      method: 'post',
      action: '#'
    }).append(
      $('<div/>', {
        'class': "row gtr-uniform",
      }).append(
        $('<div/>', {
          'class': "col-6 col-12-xsmall"
        }).append(
          $('<input/>', {
            type: 'text',
            name: 'title'
          }).attr('placeholder', 'Title')
        ).append(
          $('<input/>', {
            type: 'text',
            name: 'description'
          }).attr('placeholder', 'Description')
        ).append(categoriesElement())
      )
    )
  );
};

//TODO: load categories function to retrieve from DB

const renderMyBoardsPageLayout = function() {
  $('#main').empty();
  $('<div/>', {
    'class': 'inner'
  }).append(
    $('<header/>').append(
      $('<h1/>', {
        text: 'My Boards'
      })
    ).append(
      createBoardFormElement()
    )
  ).append(
    $('<section/>', {
      'class': 'tiles'
    })
  ).appendTo('#main');
};

//TODO: add DB fetch
const loadMyBoard = function() {
  renderMyBoardsPageLayout();
  return $.get("/boards")
    .then((boards) => {

      //TODO: add owned boards route
      renderBoardTiles(boards);
    });
};
