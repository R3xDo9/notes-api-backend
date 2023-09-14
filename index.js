const express = require('express')
const app = express()
const cors=require('cors')
const logger=require('./loggerMiddleware')

app.use(express.json())
app.use(cors())
app.use(logger)

let notes = [
    {
        id: 1,
        content: 'Holaaaa',
        important: true
    },
    {
        id: 2,
        content: 'Adfadfgsdx',
        important: false
    },
    {
        id: 3,
        content: 'uwu',
        important: true
    },
    {
        id: 4,
        content: 'jasdjjasdfaaaa',
        important: false
    },
]

app.get('/', (request, response) => {
    response.send('<h1>Hola a todos como estasi!! mundo!!</h1>')
})
app.get('/api/', (request, response) => {
    response.send('<h1>Que tal todo!!</h1><p>HOla putooooo</p>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.content) {
        response.status(400).json({
            error: 'note.content is missing'
        })
    }
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = notes.concat(newNote)
    response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.use((request,response)=>{
    console.log(request.path)
    response.status(404).json({
        error:'Not found'
    })
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})