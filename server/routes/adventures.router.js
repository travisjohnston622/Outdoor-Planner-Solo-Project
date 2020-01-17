const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET route for past adventures
router.get('/adventures', (req, res) => {
    const queryString = `SELECT * FROM "routes"
    ORDER BY "routes".name;`;
    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});


//POST route for new adventures
router.post('/adventures', (req, res) => {

});

// PUT route for updating past adventures
router.put('/adventures/:id', (req, res) => {

});

// DELETE route for deleting past adventures
router.delete('/adventures/:id', (req, res) => {

});

// GET route for a specific past adventure
router.get('/adventures/:id', (req, res) => {
    const routeId = req.params.id;

    const queryString = `SELECT "routes".route_name, "routes".id FROM "routes"
    JOIN "route_points" ON "routes".id = "route_points".routes_id
    WHERE "routes".id =${routeId};`;

    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;