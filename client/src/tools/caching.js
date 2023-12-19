export const cacheExamples = (examples) => {
  localStorage.setItem('todolistjason33_examples', JSON.stringify(examples));
}


export const getCachedExamples = () => {
  let examples = localStorage.getItem('todolistjason33_examples');

  // check if it's a possible JSON object or array
  if(/(\{.*\})|(\[.*\])/.test(examples))
    examples = JSON.parse(examples);

  return examples;
}

