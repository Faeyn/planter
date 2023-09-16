import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:8080/users";

enum InputField {
  name = "NAME",
  email = "EMAIL",
}

interface UserInput {
  id?: number;
  name: string;
  email: string;
}

export default function Home() {
  const [data, setData] = useState<Array<UserInput>>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeInput: InputField
  ) => {
    const inputValue = e.target.value;
    if (typeInput === InputField.email) {
      setEmail(inputValue);
    } else if (typeInput === InputField.name) {
      setName(inputValue);
    }
  };

  const createNewUser = async () => {
    try {
      const userInput: UserInput = { name, email };
      const body = JSON.stringify(userInput);

      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      const response = await fetch(BACKEND_URL, requestOptions);

      if (response.ok) {
        console.log("Post request was successful!");
      } else {
        console.error(`Post request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log("Error occured", error));
  }, []);

  return (
    <main>
      <div>
        <h1>Java back-end testing</h1>
      </div>
      <div>
        <h2> Add a new user</h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => handleChange(e, InputField.name)}
          />{" "}
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange(e, InputField.email)}
          />
        </div>
        <div>
          <button onClick={createNewUser}> create new user </button>
        </div>
      </div>

      <div>
        <h2> Existing users</h2>
        {data.map((record) => (
          <li key={record.id}>
            {record.name}: {record.email}
          </li>
        ))}
      </div>
    </main>
  );
}
