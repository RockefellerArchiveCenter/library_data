
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


/** Returns the value of a URL parameter */
const getQueryVariable = (query, variable) => {
  const variableList = query.startsWith("?") ? query.substring(1).split("&") : query.split("&");
  match = variableList.find(v => v.split("=")[0] === variable)
  return match ? decodeURIComponent(match.split("=")[1].replace(/\+/g, '%20')) : null
}

/** Removes unwanted characters from search terms, prefixes with targeted fields,
* handles stop words, adds boolean AND, and fuzzy matching
*/
const preProcessQueryTerm = (term, searchField) => {
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

/** only export if there is a global exports variable defined */
if (typeof exports !== "undefined") {
  exports.preProcessQueryTerm = preProcessQueryTerm;
  exports.getQueryVariable = getQueryVariable;
}
