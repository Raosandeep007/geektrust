import { useEffect, useState } from "react";
import "./App.css";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

function App() {
  let [data, setdata] = useState([]);

  let [page, setpage] = useState(1);

  useEffect(() => {
    getdata();
  }, [page]);

  const getdata = () => {
    axios
      .get(
        `https://shadow-glittery-bosworth.glitch.me/members?_page=${page}&_limit=10`
      )
      .then((res) => setdata(res.data));
  };

  const deletedata = (id) => {
    console.log(id);
    // axios.delete(`https://shadow-glittery-bosworth.glitch.me/members${id}` )
    // .then(res=>getdata());
  };

  // console.log(page);

  return (
    <div>
      <input id="search" placeholder="search by name , email or role" />
      <table>
        <thead>
          <tr>
            <th>
              <input type={"checkbox"} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input type={"checkbox"} />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                <BiEdit />{" "}
                <MdOutlineDelete onClick={() => deletedata(item.id)} />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        disabled={page === 1 ? true : false}
        onClick={() => {
          setpage(page - 1);
        }}
      >
        prev
      </button>

      <button
        disabled={page === 5 ? true : false}
        onClick={() => {
          setpage(page + 1);
        }}
      >
        next
      </button>
    </div>
  );
}

export default App;
