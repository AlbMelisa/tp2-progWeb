import PageContent from "../components/pageContent/PageContent";
import Card from "../components/card/Card";

import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <PageContent headerTitle="Página Principal">
      <Card>
        <h1 className="title3">
          <Link to={"/students"}>Módulo Alumnos</Link>
        </h1>
      </Card>
    </PageContent>
  );
};
export default MainPage;

