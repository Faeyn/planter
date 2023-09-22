import { FetchWrapper } from "../utils/fetchWrapper"
import Button from "./elements/button"
import { User } from "@/pages/api/interface"

const BACKEND_URL = "http://localhost:8080"

interface UserCardProps {
  user: User
  updateUserInfo: User
  setRefresh: React.Dispatch<React.SetStateAction<number>>
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  updateUserInfo,
  setRefresh,
}) => {
  const { id, name, email } = user

  const adress = `${BACKEND_URL}/users/${id}`
  const userFetch = new FetchWrapper(adress)

  const updateUser = () => {
    userFetch.setBody(updateUserInfo)
    userFetch.putRequest().then(() => {
      setRefresh((prevRefresh) => prevRefresh + 1)
    })
  }

  const deleteUser = async () => {
    userFetch.deleteRequest().then(() => {
      setRefresh((prevRefresh) => prevRefresh + 1)
    })
  }

  return (
    <div className="flex py-1">
      <Button text="delete" cssColor="bg-red-600" onClick={deleteUser} />
      <Button text="update" cssColor="bg-green-500" onClick={updateUser} />
      {name} : {email}
    </div>
  )
}

export default UserCard
