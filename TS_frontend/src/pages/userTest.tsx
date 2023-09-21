import Button from "@/components/elements/button"
import { FetchWrapper } from "@/utils/fetchWrapper"
import UserCard from "@/components/userCard"
import { useEffect, useState } from "react"
import { User } from "./api/interface"

const BACKEND_URL = "http://localhost:8080/users"

enum InputField {
  name = "NAME",
  email = "EMAIL",
}

const userFetch = new FetchWrapper(BACKEND_URL)

export default function Home() {
  const [data, setData] = useState<Array<User>>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [refresh, setRefresh] = useState(0)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    typeInput: InputField
  ) => {
    const inputValue = e.target.value
    if (typeInput === InputField.email) {
      setEmail(inputValue)
    } else if (typeInput === InputField.name) {
      setName(inputValue)
    }
  }

  const createNewUser = async () => {
    userFetch.setBody({ name, email } as User)
    userFetch.postRequest()
    setRefresh(refresh + 1)
  }

  const fetchData = () => {
    fetch(BACKEND_URL)
      .then((response) => {
        if (response.ok === true) {
          return response.json()
        }
      })
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.log("Error occured", error))
  }

  useEffect(() => {
    fetchData()
  }, [refresh])

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
  )
}
