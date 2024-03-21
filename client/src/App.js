import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@mui/material';
import { styled } from "@mui/material/styles";
import CustomerAdd from './components/CustomerAdd';
import CustomerDelete from './components/CustomerDelete';

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  overflowX: "auto",
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 1080
}));

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  margin: theme.spacing(2),
}));


function App() {

  let [customers, setCustomers] = useState("");
  let [completed, setCompleted] = useState(0);
  let [timer, setTimer] = useState(0);

  const stateRefresh = () => {
    fetchData()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }

  const fetchData = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  };

  const progress = () => {
    setCompleted(completed >= 100 ? 0 : completed+1)
  }
  useEffect(() => {
    const interval = setInterval(progress, 20);
    //return () => clearInterval(interval);

    
  }, [completed]);
  useEffect(() => {
    fetchData()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <StyledPaper>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              customers.map((customer) => (
                <Customer
                  key={customer.id}
                  id={customer.id}
                  image={customer.image}
                  name={customer.name}
                  birthday={customer.birthday}
                  gender={customer.gender}
                  job={customer.job}
                  stateRefresh={stateRefresh}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <StyledProgress
                    variant="indeterminate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
}

export default App;
