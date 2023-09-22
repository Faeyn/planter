import Button from "@/components/elements/button"
import { FetchWrapper } from "@/utils/fetchWrapper"
import UserCard from "@/components/userCard"
import { useEffect, useState } from "react"
import { User } from "./api/interface"
import LayoutSection from "@/components/layout/LayoutSection"

enum InputField {
  name = "NAME",
  email = "EMAIL",
}

const userFetch = new FetchWrapper("http://localhost:8080" + "/users")

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

  useEffect(() => {
    userFetch.getRequest()
  }, [refresh])

  return (
    <LayoutSection>
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
    </LayoutSection>
  )
}
