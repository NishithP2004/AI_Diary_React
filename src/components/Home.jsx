import Layout from "./Layout";
import Container from "./Container";
import Form from "./Form";
import Chart from "./Chart";

function Home(props) {
  return (
    <Layout>
      <div className="row">
        <Container>
          <Form form={props.form} setForm={props.setForm} />
        </Container>
        <Container>
          <Chart form={props.form} setForm={props.setForm} />
        </Container>
      </div>
    </Layout>
  );
}

export default Home;
