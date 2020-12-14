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
 function displaySearchResults(results, displayQuery, searchField) {
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

 /** Removes unwanted characters from search terms, prefixes with targeted fields,
 * handles stop words, adds boolean AND, and fuzzy matching
 */
 function preProcessQueryTerm(term, searchField) {
   const charsRemoved = term.replace(/:|"|'|~|\^/g, "")
   const fuzzyDistance = 1
   const fuzzyTerm = charsRemoved.concat(`~${fuzzyDistance}`)
   if (!charsRemoved) {
     return null
   }
   else {
     const targetedTerm = searchField.length ? `${searchField}:${fuzzyTerm}` : fuzzyTerm
     return stopWords.includes(charsRemoved) ? `${targetedTerm}` : `+${targetedTerm}`
   }
 }


$(document).ready(function() {

  const searchTerm = getQueryVariable('query');
  const searchField = getQueryVariable('field');

  if (searchTerm) {
    $(".results__list, .results__loading").addClass("is-loading")
    $("#query").attr("value", searchTerm);
    $("#field").val(searchField);

    const queryTerms = searchTerm.trim().toLowerCase().split(" ");
    const parsedQuery = queryTerms.map(t => (
      preProcessQueryTerm(t, searchField)
    )).filter(e => (e != null)).join(" ")

    $.getJSON("/search_index.json", function(data){
      var index = lunr.Index.load(data)
      var results = index.search(parsedQuery);
      displaySearchResults(results, searchTerm, searchField);
      $(".results__list, .results__loading").removeClass("is-loading");
    });

  }

});
