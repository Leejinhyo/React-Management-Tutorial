import './App.css';
import Customer from './components/Customer';

const customers = [
  {
    id: 1,
    image: "https://picsum.photos/id/1/200/150",
    name: "홍길동",
    birthday: "900122",
    gender: "남자",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://picsum.photos/id/2/200/150",
    name: "홍길동2",
    birthday: "910122",
    gender: "남자2",
    job: "대학생2",
  },
  {
    id: 3,
    image: "https://picsum.photos/id/3/200/150",
    name: "홍길동3",
    birthday: "93333",
    gender: "남자3",
    job: "대학생3",
  },
];

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
