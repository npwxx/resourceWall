
const categoriesElement = function(categories) {
  const $div = $('<div />', {
    'class': "col-6 col-12-small"
  });
  console.log(categories);
  for (const category of categories) {
    $div.append(
      $(`
        <input type="checkbox" id="category-${category.id}" name="category[]">
        <label for="category-${category.id}">${category.type}</label>`
      )
    );
  }
  $(`
  <div class="col-6 col-12-small">
	  <input type="checkbox" id="demo-copy" name="demo-copy">
	  <label for="demo-copy"></label>
  </div>`);
  return $div;
};


const createBoardFormElement = function(categories) {
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
        ).append(categoriesElement(categories))
      )
    )
  );
};

//TODO: load categories function to retrieve from DB
const renderMyBoardsPageLayout = function(categories) {
  $('#main').empty();
  $('<div/>', {
    'class': 'inner'
  }).append(
    $('<header/>').append(
      $('<h1/>', {
        text: 'My Boards'
      })
    ).append(
      createBoardFormElement(categories)
    )
  ).append(
    $('<section/>', {
      'class': 'tiles'
    })
  ).appendTo('#main');
};

//TODO: add DB fetch
const loadMyBoard = function() {
  // use categories route instead
  return $.get('/boards').then((/*categories*/) => {
    const categories = [{ id: 1, type: 'Sports' }, { id: 2, type: 'Gardening' }, { id: 3, type: 'Web Development' }, { id: 4, type: 'Science' }];
    console.log(categories);
    renderMyBoardsPageLayout(categories);
  }
  ).then(() => {
    return $.get("/boards");
  })
    .then((boards) => {
      //TODO: add owned boards route
      renderBoardTiles(boards);
    });
};
