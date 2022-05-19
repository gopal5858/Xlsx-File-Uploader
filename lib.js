const Note = require('./model');
const xlsx = require("xlsx");

function xlsxToValue(filePath) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // let posts = [];

  let post = {};

  for (let cell in worksheet) {
    const cellAsString = cell.toString();

    if (
      cellAsString[1] !== "r" &&
      cellAsString[1] !== "m" &&
      cellAsString[1] > 1
    ) {
      if (cellAsString[0] === "A") {
        post.id = worksheet[cell].v;
      }
      if (cellAsString[0] === "B") {
        post.title = worksheet[cell].v;
      }
      if (cellAsString[0] === "C") {
        post.author = worksheet[cell].v;
      }
      if (cellAsString[0] === "D") {
        post.date = worksheet[cell].v;

        const id = post.id;
        const title = post.title;
        const author = post.author;
        const date = post.date;
        // const newNote = new Note({
        //   id,
        //   title,
        //   author,
        //   date,
        // });
        Note.findOneAndUpdate(
          { id: id },
          { id: id, title: title, author: author, date: date},
          { upsert: true},(err,doc)=>{
            if(err){
              console.log(err);
          }else{
              console.log(doc);
          }
        }
        )

        //   newNote.save();

        post = {};
      }
    }
  }

  // console.log(posts);
}

module.exports = { xlsxToValue };
