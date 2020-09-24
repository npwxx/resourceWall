// BOARD FUNCTIONS
// BOARD TILE FUNCTIONS
const createBoardTileElement = function(board) {
  // console.log("receiving ", board);
  const d = new Date(board.created).toDateString();
  let $boardTile = $(`<article class="style3">
  <span class="image">
  <img src="images/pic01.jpg" alt="" />
  </span>
  <a href="/#/boards/${escape(board.id)}" data-navigo>
  <h2>${escape(board.title)}</h2>
  <div class="content">
  <p>Categories: ${escape(board.categories)}
  <br>
  Created: ${d}
  <br>
  Average rating: ${escape(Math.round(board.avg_rating * 100) / 100)}
    <br>
  Contains ${escape(board.resources_count)} resources
  <br>
  ${escape(board.description)}</p>
  </div>
  </a>
  </article>`);

  $('div.content > p > p').append(
    $(`
    <br>
    Created: ${d}
    <br>
    Average rating: ${escape(board.average_rating)}
    <br>
    Contains ${escape(board.resource_count)} resources </p>
    `)
  );
  return $boardTile;
};



const renderBoardTiles = function(boards) {
  console.log("frontend received", boards);
  $('.tiles').empty();
  for (let board of boards.boards) {
    const $boardTile = createBoardTileElement(board);
    $('.tiles').append($boardTile);
  }
};

const renderBoardPage = function(board) {
  $('#main').html(`
    `);
  $('#main').html(`<div class="inner">
    <header>
    <h1>${escape(board.title)}</h1>
    <p>${escape(board.description)}</p>
    </header>
    <section id="resources">
    <h2>Resources</h2>
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
    }).then((resources) => {
      renderBoardResources(resources, id);
    });
};


// RESOURCE FUNCTIONS
// TODO: Change modal with embedded URL/Video & comments/likes/rating
const createNewResource = function(boardId) {
  return $('#resources').append(
    $('<h2/>', { text: "Add New Resource" })
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
            name: 'resourceTitle'
          }).attr('placeholder', 'Title').attr('required', true)
        ).append(
          $('<input/>', {
            type: 'text',
            name: 'resourceDescription'
          }).attr('placeholder', 'Description').attr('required', true)
        ).append(
          $('<input/>', {
            type: 'text',
            name: 'resourceUrl'
          }).attr('placeholder', 'URL').attr('required', true)
        ).append(
          $('<button/>', {
            type: 'submit',
            text: 'Create Resource',
            'class': 'primary'
          })
        )
      )
    ).submit(function(event) {
      event.preventDefault();
      const serializedData = $(this).serialize();
      $.post(`/boards/${boardId}/resources/add-new-resource`, serializedData)
        .then(() => {
          loadBoard(boardId);
        });
    })
  );
};

const renderCommentModal = function(resource) {
  $("#modal-container").html(`
  <h3>Add a comment</h3>`);
  const $form = $(`
    <form>
      <input type="comment" name="comment" placeholder="Write your comment here">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `);
  $form.appendTo('#modal-container');
  $form.submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    $.ajax({ type: "POST", url: `/resources/${resource.id}/add-new-comment`, data: serializedData })
      .then(() => {
        $.modal.close();
      })
      .fail((error) => {
        console.log("Error with registration", error);
      });
  });
  $('#modal-container').modal();
};

const renderResource = function(resource) {
  let $renderResource = $(`<article id=${resource.id}>
      <main>
        <p>${escape(resource.description)}</p>
        <p><a href="${escape(resource.link)}" target="_blank" rel="noopener noreferrer">${escape(resource.link)}</a></p>
      </main>
  </article>`);
  const $header = $(`<header>
  <h2>${escape(resource.title)}</h2>
  </header >`).prependTo($renderResource);
  const $ratingContainer = $(`<div class='rating-container'>Average Rating</div>`).appendTo($header);
  const $avgRating = $('<div/>').appendTo($ratingContainer);
  $avgRating.rate({
    max_value: 5,
    initial_value: Number(resource.avg_rating),
    readonly: true
  });
  //TODO: pull date created from resource
  const $footer = $(`<footer>
  <span>${(moment(resource.date_posted).fromNow())}</span>
  </footer>`);
  $footer.appendTo($renderResource);
  // TODO: check with server and
  const $like = $('<span/>', {
    'class': 'fa fa-heart'
  }).appendTo($footer);
  $like.click(() => {
    console.log('$like');
    //TODO: HANDLE LIKE
  });
  //TODO: fix bottom margin for add comment button
  const $addComment = $('<p/>', {
    'text': "Click to add comment"
  }).appendTo($footer);
  $addComment.click(() => {
    renderCommentModal(resource);
    console.log(`$addcomment, ${resource.id}`);
  });
  // TODO: route to/from DB by user ID
  const $rater = $('<span/>').appendTo($footer);
  $rater.rate({
    min_value: 1,
    max_value: 5,
    step_size: 1
  });
  $rater.on("change", function(ev, data) {
    $.post(`/resources/${resource.id}/add-new-rating`, {
      rating: data.to
    });
    console.log(data.from, data.to);
  });

  return $renderResource;
};

// moved comment modal to new file
