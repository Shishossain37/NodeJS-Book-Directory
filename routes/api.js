const express = require('express')
const router = express.Router()
const books = require('./data/books_dumbs')
let booksDirectory = books

router.get('/books', (req, res) => {
    res.send(booksDirectory)
})
router.get('/books/:id', (req, res) => {
    const { id } = req.params
    const book = booksDirectory.find(b => b.isbn === id)
    if (!book) return res.status(404).send('Book does not exist')
    res.send(book)
})
router.post('/books', (req, res) => {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body

    const bookExist = booksDirectory.find(b => b.isbn === isbn)
    if (bookExist) {
        return res.send('Book is already exist')
    }
    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    }
    booksDirectory.push(book)
    res.send(book)
})
router.put('/books/:id', (req, res) => {
    const { id } = req.params
    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body
    const book = booksDirectory.find(b => b.isbn === id)
    if (!book) res.send('Book does not exist');
    const updateField = (val, prev) => !val ? prev : val
    const updateBook = {
        ...book,
        title: updateField(title, book.title),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    }
    const bookIndex = booksDirectory.findIndex(b => b.isbn === id)
    booksDirectory.splice(bookIndex, 1, updateBook)
    res.send(updateBook)
})
router.delete('/books/:id', (req, res) => {
    const { id } = req.params
    let book = booksDirectory.find(b => b.isbn === id)
    if (!book) return res.status(404).send('Book does not exist')
    booksDirectory = booksDirectory.filter(b => b.isbn !== id)
    res.send('success')
})



module.exports = router