import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledHidden = styled('input')(({ theme }) => ({
  display: "none",
}));


function CustomerAdd(props) {

    const [inputs, setInputs] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
    })

    const { file, userName, birthday, gender, job, fileName, open } = inputs;


    const addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', file);
        formData.append("name", userName);
        formData.append("birthday", birthday);
        formData.append("gender", gender);
        formData.append("job", job);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        return axios.post(url, formData, config);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCustomer()
            .then(response => {
                console.log(response.data);
                props.stateRefresh();
            })
        setInputs({
          file: null,
          userName: "",
          birthday: "",
          gender: "",
          job: "",
          fileName: "",
          open: false
        });
        
    }

    const handleFileChange = (e) => {
        setInputs({
          ...inputs,
          file: e.target.files[0],
          fileName: e.target.value
        });
    }

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    };

    const handleClickOpen = () => {
      setInputs({
        ...inputs,
        open: true
      });
    }
    const handleClickClose = () => {
      setInputs({
        ...inputs,
        file: null,
        userName: "",
        birthday: "",
        gender: "",
        job: "",
        fileName: "",
        open: false,
      });
    }


    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={open} onClose={handleClickClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <StyledHidden
              id="raised-button-file"
              type="file"
              accept="image/*"
              file={file}
              value={fileName}
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                name="file"
                component="span"
              >
                {fileName === "" ? "프로필 이미지 선택" : fileName}
              </Button>
            </label>
            <br />
            <TextField
              label="이름"
              type="text"
              name="userName"
              value={userName}
              onChange={handleValueChange}
            />
            <br />
            <TextField
              label="생년월일"
              type="text"
              name="birthday"
              value={birthday}
              onChange={handleValueChange}
            />
            <br />
            <TextField
              label="성별"
              type="text"
              name="gender"
              value={gender}
              onChange={handleValueChange}
            />
            <br />
            <TextField
              label="직업"
              type="text"
              name="job"
              value={job}
              onChange={handleValueChange}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color="primary" onClick={handleFormSubmit}>추가</Button>
            <Button variant='outloined' color="primary" onClick={handleClickClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default CustomerAdd;