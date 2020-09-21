
const renderMyBoardsPageLayout = function() {
  $('#main').html(`<div class="inner">
  <header>
    <h1>My Boards</h1>
    <section>
			<h2>Create New Board</h2>
      <form method="post" action="#">
        <div class="row gtr-uniform">
				  <div class="col-6 col-12-xsmall">
            <input type="text" name="boardTitle" id="boardTitle" value="" placeholder="Title" />
            <input type="text" name="description" id="boardTitle" value="" placeholder="Description" />
            <div class="col-12">
							<select name="demo-category" id="demo-category">
								<option value="">-Category1-</option>
								<option value="1">Category2</option>
								<option value="1">Category3</option>
								<option value="1">Category4</option>
								<option value="1">Category5</option>
							</select>
						</div>
          </div>
        </div>
      </form>
    </section>
  </header>
  <section class="tiles">
  </section>
</div>`);
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
