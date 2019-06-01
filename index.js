const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/projects.sqlite3',
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

server.post('/api/projects', async (req, res) => {
    try {
        const [id] = await db('project').insert(req.body);

        const project = await db('project')
            .where({ id })
            .first();

        res.status(201).json(project);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.post('/api/actions', async (req, res) => {
    try {
        const [id] = await db('action').insert(req.body);

        const action = await db('action')
            .where({ id })
            .first();

        res.status(201).json(action);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.get('/api/projects', async (req, res) => {
    try {
        const projects = await db('project');

        res.status(200).json(projects);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await db('project')
            .where({ id: req.params.id })
            .first();

        res.status(200).json(project);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.get('/api/actions', async (req, res) => {
    try {
        const actions = await db('action');

        res.status(200).json(actions);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

server.get('/api/actions/:id', async (req, res) => {
    try {
        const action = await db('action')
            .where({ id: req.params.id })
            .first();

        res.status(200).json(action);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

const port = process.env.PORT || 6000;
server.listen(port, () => {
    console.log(`\n** API running on http://localhost:${port} **\n`);
});
