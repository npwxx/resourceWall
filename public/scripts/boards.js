// BOARD FUNCTIONS
// BOARD TILE FUNCTIONS
// TODO: readd categories
// <p>Categories: ${escape(board.categories)}
const createBoardTileElement = function(board) {
  const d = new Date(board.created).toDateString();
  let $boardTile = $(`<article class="style3">
  <span class="image">
  <img src="images/pic01.jpg" alt="" />
  </span>
  <a href="/#/boards/${escape(board.id)}" data-navigo>
  <h2>${escape(board.title)}</h2>
  <div class="content">
  <p>
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
  $('.tiles').empty();
  for (let board of boards) {
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
  $.get('/users/me').then((user) => {
    if (user) {
      createNewResource()
      $.get(`/boards/${id}`)
        .then((boards) => {
          // console.log(boards);
          renderBoardPage(boards[0]);
        }).then(() => {
          return $.get(`/boards/${id}/resources`);
        }).then((resources) => {
          renderBoardResources(resources, id);
        });
    } else {
    $.get(`/boards/${id}`)
    .then((boards) => {
      // console.log(boards);
      renderBoardPage(boards[0]);
    }).then(() => {
      return $.get(`/boards/${id}/resources`);
    }).then((resources) => {
      renderBoardResources(resources, id);
    });
    }
  })
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
              text: 'Create Resource',
              'class': 'primary'
            })
          )
        )
      ).submit(function(event) {
        event.preventDefault();
        const serializedData = $(this).serializeFormJSON();
        $.post(`/boards/${boardId}/resources/add-new-resource`, serializedData)
          .then(() => {
            loadBoard(boardId);
          });
      })
    )
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
    $.ajax({ type: "POST", url: `/resources/${resource.id}/add-new-comment`, data: serializedData }) // pull this out to comments route
      .then(() => {
        $.modal.close();
      })
      .fail((error) => {
        console.log("Error with registration", error);
      });
  });
  $('#modal-container').modal();
};

const renderSeeCommentsModal = function(resource) {
  $.get(`/resources/comments/${resource.id}`)

  .then((comments) => {
    for (comment of comments) {
      const $comment = $(`
      <article id=${resource.id}>
      <main>
        <p>${escape(comment.comment)}</p>
      </main>
      </article>`);
      let commentDate = comment.date_posted;
      commentDate = new Date(commentDate);
      commentHours = commentDate.getHours();
      commentMinutes = commentDate.getMinutes();
      commentDateParsed = commentDate.toDateString();
      const $footer = $(`<footer>
      <p>Written by: ${escape(comment.author)} on ${commentDateParsed}<p>
      </footer >`);
      console.log("frontendcomments", comment)
      $comment.appendTo('#modal-container');
      $footer.appendTo($comment);
    };
  })
  $("#modal-container").html(`
  <h2>User comments for this resource</h2>`);




  // $form.appendTo('#modal-container');
  // $form.submit(function(event) {
  //   event.preventDefault();
  //   const serializedData = $(this).serialize();
  //   $.ajax({ type: "POST", url: `/resources/comments/${resource.id}/add-new-comment`, data: serializedData })
  //     .then(() => {
  //       $.modal.close();
  //     })
  //     .fail((error) => {
  //       console.log("Error with registration", error);
  //     });
  // });
  $('#modal-container').modal();
};

const renderResource = function(resource) {
  console.log("resourcescoming through", resource.resource_url)
  let $renderResource = $(`<article id=${resource.id}>
      <main>
        <p>${escape(resource.description)}</p>
        <p><a href="${escape(resource.resource_url)}" target="_blank" rel="noopener noreferrer">${escape(resource.resource_url)}</a></p>
      </main>
  </article>`);
  const $header = $(`<header>
  <h2>${escape(resource.title)}</h2>
  </header >`).prependTo($renderResource);

  //add rating container
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
    console.log("llogging resourceid: ", resource.id);
    $.ajax({ type: "POST", url: `/resources/${resource.id}/add-new-like`, data: resource.id })
    .then(() => {
      console.log("posted like to server");
      $like.fadeTo(300, 0.25);
    })
  });
  //TODO: fix bottom margin for add comment button and see comments
  const $addComment = $(`
  <p> Click to add comment </p>
  `).appendTo($footer);
  $addComment.click(() => {
    renderCommentModal(resource);
    console.log(`$addcomment, ${resource.id}`);
  });

  const $seeComments = $(`
  <p> Click to see comments </p>
  `).appendTo($footer);
  $seeComments.click(() => {
    renderSeeCommentsModal(resource);
    console.log('$seeComments');
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
