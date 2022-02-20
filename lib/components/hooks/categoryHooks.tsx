import { useFirestoreDocData, useUser } from "reactfire"
import { db } from 'lib/firebase/init'
import { doc } from "firebase/firestore";

export const useUserCategories = () => {
  const user = useUser();
  const userUid = !!user && !!user.data ? user.data.uid : "asdf";
  const userCol = doc(db, "users", userUid);

  const { status, data } = useFirestoreDocData(
    userCol,
    { idField: "id" }
  );

  return {
    data,
    status,
  }
}

export const useSingleCategory = (id: string) => {
  const categoryCol = doc(db, "categories", id);

  const { status, data } = useFirestoreDocData(
    categoryCol,
    { idField: "id" }
  );

  return {
    data, 
    status
  }
}