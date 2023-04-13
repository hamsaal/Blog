exports.checkKebab = function(text){
  const pattern = /(\w+)-(\w)([\w-]*)/
  return pattern.test(text) && !text.includes('_')
}
