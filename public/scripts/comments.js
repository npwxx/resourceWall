// CLICK HANDLER & MODAL FUNCTION FOR RESOURCES
const renderBoardResources = function(resources, boardId) {
  console.log("rendering board resources", resources)
  $('#resources').empty();
  if (boardId) {
    const $newResource = createNewResource(boardId);
  }
  for (const resource of resources) {
    const $resource = renderResource(resource);
    console.log("single resource : ", resource)
    $resource.appendTo('#resources');
  }
};

const renderResourceModal = function(resource) {
  $("#modal-container").html('<h3>resource placeholder</h3>');
  const $form = $(`
    <form>
      <div>
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div>
      <input type="password" name="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      `);
  $form.appendTo('#modal-container');
  $form.submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    //submit data to the server
    $.post("/login", serializedData)
      .then(() => {
      });
  });
  $('#modal-container').modal();
};
