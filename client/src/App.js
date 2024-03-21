import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CustomerAdd from './components/CustomerAdd';
import CustomerDelete from './components/CustomerDelete';

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  minWidth: 1080
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 1080
}));

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


function App() {

  let [customers, setCustomers] = useState("");
  let [completed, setCompleted] = useState(0);
  let [searchKeyword, setSearchKeyword] = useState('');

  const stateRefresh = () => {
    setCustomers('')
    setCompleted(0)
    setSearchKeyword('')
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

  const cellList = ['번호', '이미지', '이름', '생년월일', '성별', '직업', '삭제'];

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  }

  const filterComponent = (data) => {
    data = data.filter(c => {
      return c.name.indexOf(searchKeyword) > -1;
    })
    return data.map((customer) => {
      return (
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
      );
    });
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
              inputProps={{ "aria-label": "search" }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <StyledPaper>
        <StyledTable>
          <TableHead>
            <TableRow>
              {cellList.map((cell) => (
                <TableCell>cell</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              filterComponent(customers)
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <StyledProgress variant="indeterminate" value={completed} />
                </TableCell>
              </TableRow>
            )}
            {/* 
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
                  <StyledProgress variant="indeterminate" value={completed} />
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </Box>
  );
}

export default App;
