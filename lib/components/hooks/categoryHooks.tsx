import { useFirestoreDoc, useFirestoreDocData, useFirestoreDocDataOnce, useUser } from "reactfire"
import { db } from 'lib/firebase/init'
import { doc } from "firebase/firestore";
import { ICategory } from "lib/types/category.type";

export const useUserCategories = () => {
  const user = useUser();
  const userCol = doc(db, "users", user.data!.uid)

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