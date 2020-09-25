// CLICK HANDLER & MODAL FUNCTION FOR RESOURCES
const renderBoardResources = function(resources) {
  $('#resources').empty();
  for (const resource of resources) {
    const $resource = renderResource(resource);
    $resource.appendTo('#resources');
  }
};
