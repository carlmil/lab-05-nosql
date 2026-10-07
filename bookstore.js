// Step 2: 
// use bookstore 
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop() // drops any existing authors collection
doc = JSON.parse(fs.readFileSync("authors.json", "utf8")) // reads authors.json file 
db.authors.insertMany(doc) // inserts authors.json data in table

// Step 4: load books.json
db.books.drop() // drops any existing books colelction
doc = JSON.parse(fs.readFileSync("books.json", "utf8")) // reads books.json file
db.books.insertMany(doc) // inserts books.json data in table

// Step 5: list authors and books
db.authors.find() // lists all content in authors
db.books.find() // lists all content in books

// Step 6: insert two new books
db.books.insertOne({ _id: ObjectId('6ac46ff9a519073dd272be93'),title: 'Intermezzo', published_year: 2024, author_ids: [ 'author_004' ]}); // inserts Intermezzo with respective publishing year and author id
db.books.insertOne({ _id: ObjectId('6ac46ff9a519073dd272be94'), title: 'Emma', published_year: 1815, author_ids: [ 'author_001' ]}); // inserts Emma with respective publishing year and author id

// Step 7: add missing authors
db.authors.insertOne({ _id: 'author_004', name: 'Sally Rooney', nationality: 'Irish', bio: { short: 'Irish novelist and screenwriter best know for her stream of consciousness writing style.', long: 'Sally Rooney is an Irish novelist whose works often touch on class, politics, and relationships. One of her most popular works, Normal People, has been turned into a television series.'}}); //inserts author Sally Rooney along with her id, nationality, and bios

// Step 8: filter books by a list of authors
db.books.find({ author_ids: { $in: ["author_001", "author_004"] } }) // returns books written by author_001 and author_004

