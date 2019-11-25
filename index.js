const express = require('express')
const app = express()
const port = 3000

const connection = require('./conf')

const bodyParser = require('body-parser')
// Support JSON-encoded bodies
app.use(bodyParser.json())
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

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

// écoute de l'url "/api/employees" avec le verbe POST
app.post('/api/movies', (req, res) => {
  // récupération des données envoyées
  const formData = req.body

  // connexion à la base de données, et insertion du film
  connection.query(
    'INSERT INTO movie SET ?',
    formData,
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err)
        res
          .status(500)
          .send("Erreur lors de la sauvegarde d'un employé")
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200)
      }
    },
  )
})

// écoute de l'url "/api/movies"
app.put('/api/movies/:id', (req, res) => {
  // récupération des données envoyées
  const idMovie = req.params.id
  const formData = req.body

  // connection à la base de données, et insertion d'un film'
  connection.query(
    'UPDATE movie SET ? WHERE id = ?',
    [formData, idMovie],
    err => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err)
        res
          .status(500)
          .send("Erreur lors de la modification d'un film")
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200)
      }
    },
  )
})

app.listen(port, err => {
  if (err) {
    throw new Error('Something bad happened...')
  }

  console.log(`Server is listening on ${port}`)
})
