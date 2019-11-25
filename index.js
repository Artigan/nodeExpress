const express = require('express')
const app = express()
const port = 3000

const connection = require('./conf')

// écoute de l'url "/api/employees"
app.get('/api/movies', (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from movie', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films')
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results)
    }
  })
})

app.get('/api/movies/names', (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query('SELECT name from movie', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des films')
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results)
    }
  })
})

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...')
  }

  console.log(`Server is listening on ${port}`)
})
