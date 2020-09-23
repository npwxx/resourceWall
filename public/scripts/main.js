// MAIN PAGE FUNCTION
const renderMainPageLayout = function() {
  $('#main').html(`<div class="inner">
  <div class='board-search'>
  <header>
    <h1>Top Boards</h1>
    <form class='board-category-search'>
      <input type='text' placeholder='Search Categories'></input>
      <button type='submit'><i class='fa fa-search'></i></button>
    </form>
    <p>TODO: Add search bar & functionality FILTER BY users, category</p>
  </header>
  <section class="tiles">
  </section>
  </div>
  <div class='resource-search'>
  <header>
    <h1>Top Resources</h1>
    <form class='resource-category-search'>
      <input type='text' palceholder='Search Categories' name='search'></input>
      <button type='submit'><i class='fa fa-search'></i></button>
    </form>
    <p>TODO: Add search bar & functionality FILTER BY category</p>
  </header>
  <section class="resources">
  </section>
  </div>
</div>`);
};

// // SEACH FUNCTIONS
// // boards
// <form accept-charset="utf-8" action="/s/ref=nb_sb_noss" class="nav-searchbar" method="GET" name="board-search" role="search">
//   <div class="nav-left">
//     <div id="nav-search-dropdown-card">
//       <div class="nav-search-scope nav-sprite">
//         <div class="nav-search-facade" data-value="search-alias=aps">
//           <span class="nav-search-label" style="width: auto;">All</span>
//           <i class="nav-icon"></i>
//         </div>
//         <span id="searchDropdownDescription" style="display:none">Select the department you want to search in</span>
//         <select aria-describedby="searchDropdownDescription" class="nav-search-dropdown searchSelect" data-nav-digest="x91FRHH5Ey0T3w80iSqEjQsbgCw=" data-nav-selected="0" id="searchDropdownBox" name="url" style="display: block; top: 2.5px;" tabindex="0" title="Search in">
//           <option selected="selected" value="baords">categories</option>
//           <option value="search-alias=alexa-skills">users</option>
//         </select>
//       </div>

//     </div>
//   </div>
//   <div class="nav-fill">
//     <div class="nav-search-field ">
//       <input type="text" id="twotabsearchtextbox" value="" name="field-keywords" autocomplete="off" placeholder="" class="nav-input" dir="auto" tabindex="0" aria-label="Search">
//       </div>
//       <div id="nav-iss-attach"></div>
//     </div>
//     <div class="nav-right">
//       <div class="nav-search-submit nav-sprite">
//         <span id="nav-search-submit-text" class="nav-search-submit-text nav-sprite" aria-label="Go">
//           <input type="submit" class="nav-input" value="Go" tabindex="0">
//         </span>
//       </div>
//       </div>
//   </form>
//     {/* resources */}
//     <form accept-charset="utf-8" action="/s/ref=nb_sb_noss" class="nav-searchbar" method="GET" name="site-search" role="search">
//       <div class="nav-left">
//         <div id="nav-search-dropdown-card">

//           <div class="nav-search-scope nav-sprite">
//             <div class="nav-search-facade" data-value="search-alias=aps">
//               <span class="nav-search-label" style="width: auto;">All</span>
//               <i class="nav-icon"></i>
//             </div>
//             <span id="searchDropdownDescription" style="display:none">Select the department you want to search in</span>
//             <select aria-describedby="searchDropdownDescription" class="nav-search-dropdown searchSelect" data-nav-digest="x91FRHH5Ey0T3w80iSqEjQsbgCw=" data-nav-selected="0" id="searchDropdownBox" name="url" style="display: block; top: 2.5px;" tabindex="0" title="Search in">
//               <option selected="selected" value="search-alias=aps">category</option>
//               <option value="search-alias=alexa-skills">users</option>

//             </select>
//           </div>

//         </div>
//       </div>
//       <div class="nav-fill">
//         <div class="nav-search-field ">
//           <input type="text" id="twotabsearchtextbox" value="" name="field-keywords" autocomplete="off" placeholder="" class="nav-input" dir="auto" tabindex="0" aria-label="Search">
//       </div>
//           <div id="nav-iss-attach"></div>
//         </div>
//         <div class="nav-right">
//           <div class="nav-search-submit nav-sprite">
//             <span id="nav-search-submit-text" class="nav-search-submit-text nav-sprite" aria-label="Go">
//               <input type="submit" class="nav-input" value="Go" tabindex="0">
//         </span>
//       </div>
//           </div>
//   </form>