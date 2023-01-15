import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../App/store";

type Props = {
   children: JSX.Element
}

function ProtectedRoute(props: Props) {
   const { session } = useSelector((state: RootState) => state);

   if (!session.token) {
      return <Navigate to="/" />
   }
   return props.children;
}
export default ProtectedRoute;
