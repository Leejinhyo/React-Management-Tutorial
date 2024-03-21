import React, { useState } from 'react';
import axios from 'axios';

function CustomerAdd(props) {

    const [inputs, setInputs] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
    })

    const { file, userName, birthday, gender, job, fileName } = inputs;

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

    return (
      <form onSubmit={handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지 :
        <input
          type="file"
          name="file"
          file={file}
          value={fileName}
          onChange={handleFileChange}
        />
        <br />
        이름:
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleValueChange}
        />
        <br />
        생년월일:{" "}
        <input
          type="text"
          name="birthday"
          value={birthday}
          onChange={handleValueChange}
        />
        <br />
        성별:{" "}
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={handleValueChange}
        />
        <br />
        직업:{" "}
        <input
          type="text"
          name="job"
          value={job}
          onChange={handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
}

export default CustomerAdd;