import Title from "./components/Title";
import UserAdd from "./components/UserAdd";
import UserTable from "./components/UserTable";

function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <Title></Title>
        <UserAdd />
      </div>
      <UserTable></UserTable>
    </div>
  );
}

export default Home;
