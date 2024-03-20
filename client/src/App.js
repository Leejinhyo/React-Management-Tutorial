import { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

function App() {

  let [customers, setCustomers] = useState("");

  const fetchData = async () => {
    await fetch('/api/customers')
      .then(res=>res.json())
      .then(result=> {
        setCustomers(result);
      });
  };

  useEffect( ()=> {
    fetchData();
  }, []);

  
  return (
    <Paper>
      <Table>
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
          {customers && 
            customers.map((customer) => (
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
