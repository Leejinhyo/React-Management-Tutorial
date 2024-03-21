import { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@mui/material';
import { styled } from "@mui/material/styles";
import CustomerAdd from './components/CustomerAdd';

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: (value) => value * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: (value) => value * 2,
  },
});


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
      <Paper className={styles.root}>
        <Table className={styles.table}>
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
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={styles.progress}
                    variant="indeterminate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </div>
  );
}

export default styled(App)(styles);
