$(document).ready(function() {

  function displaySearchResults(results, query) {
    if (results.length) { // Are there any results?
      var appendString = '<ul class="list--unstyled">'

      $.getJSON("/search_data.json", function(documents){
        for (r in results) {  // Iterate over the results
          let item = documents[results[r].ref];
          appendString +=
            `<li class="tile">
              <a class="tile__link" href="${item.url}">
                <p class="tile__title">${item.title}</p>
                <p class="tile__callnumber">${item.call_numbers}</p>
                <p class="tile__authors"><strong>Author(s)</strong>: ${item.author}</p>
                <p class="tile__date"><strong>Published</strong>: ${item.dates}</p>
              </a>
            </li>`;
        }
        appendString += '</ul>'
        $('#results').append(appendString);
      });
    }
    $('#results').prepend(`
      <p class="results__summary">
        ${results.length ? results.length : 0} ${results.length === 1 ? "result" : "results" } for "${query}" in ${searchField ? searchField : "all fields"}
      </p>`)
    $("#results").removeClass("isLoading");
  }

  function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  let searchTerm = getQueryVariable('query');
  var searchField = getQueryVariable('field');

  if (searchTerm) {
    $('#results').addClass("isLoading")
    $('#query').attr("value", searchTerm);
    $("#field").val(searchField);

    $.getJSON("/search_index.json", function(data){
      let index = lunr.Index.load(data)

      if (searchField.length){
        var results = index.search(`${searchField}:${searchTerm}`); // Get lunr to perform a search
      } else {
        var results = index.search(searchTerm);
      }
      displaySearchResults(results, searchTerm);

    });

  }

});
