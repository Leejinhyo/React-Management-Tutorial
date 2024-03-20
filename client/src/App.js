import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const customers = [
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
];

function App() {
  
  return (
    <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <Customer
              key={customer.id}
              id={customer.id}
              image={customer.image}
              name={customer.name}
              birthday={customer.birthday}
              gender={customer.gender}
              job={customer.job}
            />
          ))}

        </TableBody>
        
      </Table>
    </Paper>
  );
}

export default App;
