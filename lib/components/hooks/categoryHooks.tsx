import { useFirestoreDocData, useFirestoreDocDataOnce, useUser } from "reactfire"
import { db } from 'lib/firebase/init'
import { doc } from "firebase/firestore";

export const useCategories = () => {
  const user = useUser();
  const userCol = doc(db, "users", user.data!.uid)

  const { status, data } = useFirestoreDocData(
    userCol,
    { idField: "id" }
  )

  return {
    data,
    status,
  }
}