import Button from "@/components/button";
import { FetchWrapper } from "@/components/fetchWrapper";
import UserCard from "@/components/userCard";
import { useEffect, useState } from "react";
import { User } from "./api/interface";

const BACKEND_URL = "http://localhost:8080/users";

enum InputField {
  name = "NAME",
  email = "EMAIL",
}

const userFetch = new FetchWrapper(BACKEND_URL);

export default function Home() {
  const [data, setData] = useState<Array<User>>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [refresh, setRefresh] = useState(0);

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
      const userInput: User = { name, email };
      const body = JSON.stringify(userInput);

      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };

      const response = await fetch(BACKEND_URL, requestOptions);

      console.log(await response.body);

      if (response.ok) {
        console.log("Post request was successful!");
      } else {
        console.error(`Post request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
    setRefresh(refresh + 1);
  };

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <main className={"flex flex-col justify-center px-5"}>
      <div>
        <h1>Java back-end testing</h1>
      </div>
      <div>
        <h2> Add a new user</h2>
        <div className={"pb-5"}>
          <input
            className="border border-black"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => handleChange(e, InputField.name)}
          />{" "}
          <input
            className="border border-black"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange(e, InputField.email)}
          />
        </div>
        <Button text="Create new user" onClick={createNewUser} />
      </div>
      <div>
        <h2> Existing users</h2>
        {data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            setRefresh={setRefresh}
            updateUserInfo={{ name, email } as User}
          />
        ))}
      </div>
    </main>
  );
}
