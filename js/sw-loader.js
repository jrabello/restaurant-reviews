if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(window.location.pathname+'sw.js').then((reg) => {
        console.log('SW success: ', reg);
    }).catch((err) => {
        console.log('Error:', err);
    });
  }