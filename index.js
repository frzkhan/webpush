const path = require('path')
const webpush = require('web-push')
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys)
webpush.setVapidDetails(
  'mailto:faraz@sportsmail.net',
  'BANR52ZS7O03sN-OeDUosQ6MU45JIIlDO5z90KpaHQPhLsFZcG-f7Z9CRrmzErYoNO_clABmEgSD6qjvlrZ9-gQ',
  '3zen7yeawUZw6poVd6jO4VzUly6DfSDmC2ZbPsfkV0s'
)
const fastify = require('fastify')({
  logger: true
})
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})
// Declare a route
fastify.get('/', function (request, reply) {
  reply.sendFile('index.html')
})

fastify.post('/push', (request, reply) => {
  const { subscription, data } = request.body
  const payload = JSON.stringify(data);

  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
  reply.send()
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
