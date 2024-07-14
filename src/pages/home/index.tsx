import Title from "./components/Title";
import UserAdd from "./components/UserAdd";
import UserTable from "./components/UserTable";
import Logout from "../login/Logout";

function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <Title></Title>
        <div className="flex items-center gap-4">
          <UserAdd />
          <Logout />
        </div>
      </div>
      <UserTable></UserTable>
    </div>
  );
}

export default Home;
