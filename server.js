const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    debugger;
    res.send([
      {
        id: 1,
        image: "https://picsum.photos/id/1/64/64",
        name: "홍길동",
        birthday: "900122",
        gender: "남자",
        job: "대학생",
      },
      {
        id: 2,
        image: "https://picsum.photos/id/2/64/64",
        name: "홍길동2",
        birthday: "910122",
        gender: "남자2",
        job: "대학생2",
      },
      {
        id: 3,
        image: "https://picsum.photos/id/3/64/64",
        name: "홍길동3",
        birthday: "93333",
        gender: "남자3",
        job: "대학생3",
      },
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));