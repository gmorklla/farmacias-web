// The service worker running in background to receive the incoming
// push notifications and user clicks

// A push has arrived ...
self.addEventListener('push', function(event) {
  // Since there is no payload data with the first version  
  // of push messages, we'll use some static content. 
  // However you could grab some data from  
  // an API and use it to populate a notification

  var title = 'Tenemos noticias para ti';  
  var body = 'Visita nuestra página para enterarte';  
  var icon = 'images/carita.png'; 

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon
    })  
  );  
});


// The user has clicked on the notification ...
self.addEventListener('notificationclick', function(event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)      
      var url = '/propuesta';    
      return clients.openWindow(url);
  }));
});
