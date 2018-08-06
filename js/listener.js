// recursive function to remove tabbing from google maps :)
addTabIndexNegative = (tree) => {
    if(!tree) return;
    const isIframe = 
        tree && 
        tree.tagName && 
        tree.tagName.toLocaleLowerCase() === `iframe` && 
        tree.contentDocument;
    let children = isIframe ? 
      tree.contentDocument.childNodes :
      tree.childNodes;
  
    for(child of children) {
      if (child.tabIndex >= 0) {
        // console.log(`untabbing: `, child);
        child.tabIndex = -1;
      }
      addTabIndexNegative(child);
    }
  };
  
  listenMapChanges = () => {
    const targetNode = document.getElementById('map');
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    // Callback function to execute when mutations are observed
    const callback = function(mutationsList) {
        for(var mutation of mutationsList) {
            if ( mutation.type == 'childList' || mutation.type == 'attributes') {
                // console.log(mutation);
                addTabIndexNegative(mutation.target);
            }
        }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
  listenMapChanges();