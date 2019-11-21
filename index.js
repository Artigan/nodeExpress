const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express')
})

app.get('/api/movies/', (request, response) => {
  response.send('Récupération de tous les films')
})

app.get('/api/movies/:id', (request, response) => {
  response.json({ id: request.params.id })
})

app.get('/api/employee', (request, response) => {
  if (request.query.name) {
    response
      .status(404)
      .send(`Unable to retrieve ${request.query.name}`)
  } else {
    response.sendStatus(304)
  }
})

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...')
  }

  console.log(`Server is listening on ${port}`)
})
