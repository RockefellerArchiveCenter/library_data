$(document).ready(function() {

  /** Stop words pulled from https://lunrjs.com/docs/stop_word_filter.js.html */
  const stopWords = ['a','able','about','across','after','all','almost','also',
                     'am','among','an','and','any','are','as','at','be','because',
                     'been','but','by','can','cannot','could','dear','did','do',
                     'does','either','else','ever','every','for','from','get',
                     'got','had','has','have','he','her','hers','him','his','how',
                     'however','i','if','in','into','is','it','its','just','least',
                     'let','like','likely','may','me','might','most','must','my',
                     'neither','no','nor','not','of','off','often','on','only',
                     'or','other','our','own','rather','said','say','says','she',
                     'should','since','so','some','than','that','the','their','them',
                     'then','there','these','they','this','tis','to','too','twas',
                     'us','wants','was','we','were','what','when','where','which',
                     'while','who','whom','why','will','with','would','yet',
                     'you','your']

  /** Displays search results in the DOM */
  function displaySearchResults(results, displayQuery) {
    if (results.length) { // Are there any results?
      var appendString = '<ul class="tile-list">'

      $.getJSON("/search_data.json", function(documents){
        for (r in results) {  // Iterate over the results
          let item = documents[results[r].ref];
          appendString +=
            `<li class="tile">
              <h2 class="tile__title">
                <a class="tile__link" href="${item.url}">${item.title}</a>
              </h2>
              <p class="tile__callnumber">${item.call_numbers}</p>
              <p class="tile__authors"><strong>Author(s)</strong>: ${item.author}</p>
              <p class="tile__date"><strong>Published</strong>: ${item.dates}</p>
            </li>`;
        }
        appendString += '</ul>'
        $(".results__list").append(appendString);
      });
    }
    $(".results__list").prepend(`
      <h1 class="results__summary">
        ${results.length ? results.length : 0} ${results.length === 1 ? "result" : "results" } for "${displayQuery}" in ${searchField ? searchField : "all fields"}
      </h1>`)
    $(".results__list, .results__loading").removeClass("is-loading");
  }

  /** Returns the value of a URL parameter */
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

  /** Removes unwanted characters from search terms, terms that match a
  * stop words list, adds boolean AND, and fuzzy matching
  */
  function preProcessQueryTerm(term) {
    var processed = term.replace(/:|"|'|~|\^/g, "")
    return (processed && !stopWords.includes(processed)) ? `+${processed}~1` : null
  }

  let searchTerm = getQueryVariable('query');
  var searchField = getQueryVariable('field');

  if (searchTerm) {
    var parsedQuery = "";
    $(".results__list, .results__loading").addClass("is-loading")
    $("#query").attr("value", searchTerm);
    $("#field").val(searchField);

    let queryTerms = searchTerm.trim().toLowerCase().split(" ");
    if (queryTerms.length === 1){
      parsedQuery = preProcessQueryTerm(queryTerms[0]);
    } else {
      parsedQuery = queryTerms.map(t => (
        preProcessQueryTerm(t)
      ))
      .filter(e => (e != null))
      .join(" ")
    }

    $.getJSON("/search_index.json", function(data){
      var index = lunr.Index.load(data)

      if (searchField.length) {
        var results = index.search(`${searchField}:${parsedQuery}`);
      } else {
        var results = index.search(parsedQuery);
      }

      displaySearchResults(results, searchTerm);

    });

  }

});
