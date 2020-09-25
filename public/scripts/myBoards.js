const loadMyBoard = function() {
  // use categories route instead
  return $.get('/boards').then((/*categories*/) => {
    const categories = [{ id: 1, type: 'Sports' }, { id: 2, type: 'Gardening' }, { id: 3, type: 'Web Development' }, { id: 4, type: 'Science' }];
    renderMyBoardsPageLayout(categories);
  })
    .then(() => {
      $.get("/users/myboards")
        .then((boards) => {
          //TODO: add owned boards route
          renderBoardTiles(boards);
        });
    });
};

const categoriesElement = function(categories) {
  const $div = $('<div />', {
    'class': "col-6 col-12-small"
  });
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
    $('<form/>').append(
      $('<div/>', {
        'class': "row gtr-uniform",
      }).append(
        $('<div/>', {
          'class': "col-6 col-12-xsmall"
        }).append(
          $('<input/>', {
            type: 'text',
            name: 'boardTitle'
          }).attr('placeholder', 'Title')
        ).append(
          $('<input/>', {
            type: 'text',
            name: 'boardDescription'
          }).attr('placeholder', 'Description')
        ).append(
          $('<input/>', {
            type: 'text',
            name: 'category'
          }).attr('placeholder', 'Category 1')
        ).append(
          $('<input/>', {
            type: 'text',
            name: 'category'
          }).attr('placeholder', 'Category 2')
        ).append(
          $('<button/>', {
            type: 'submit',
            text: 'Create Board',
            'class': 'primary'
          })
        )
      )
    ).submit(function(event) {
      event.preventDefault();
      const serializedData = $(this).serializeFormJSON();
      //submit data to the server
      console.log(serializedData);
      $.post("/boards/create", serializedData)
        .then(() => {
          loadMyBoard().then(() => {
            router.updatePageLinks();
          });
        });
    })
  );
};

//TODO: add DB fetch
const renderLikedResourcesSection = function() {
  return $(`<div class="inner">
  <div class='resource-search'>
  <header class='resource-header'>
    <h1>My Liked Resources</h1>
  </header>
  <section id="resources">
  </section>
  </div>
  </div>`);
};

const getLikedResourcesByOwnerId = function() {
  $.get(`/users/likedresources`)
    .then((resources) => {
      console.log("frontendresources rec'd: ", resources);
      renderBoardResources(resources);
    });
};

//TODO: load categories function to retrieve from DB
const renderMyBoardsPageLayout = function(categories) {
  $('#main').empty();
  $('<div/>', {
    'class': 'inner'
  }).append(
    $('<header/>').append(
      $('<h1/>', {
        text: `My Boards `
      })
    ).append(
      createBoardFormElement(categories)
    )
  ).append(
    $('<section/>', {
      'class': 'tiles'
    })
  ).append(
    renderLikedResourcesSection()
  ).appendTo('#main');
  getLikedResourcesByOwnerId();

};




// UTIL FUNCTION
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


