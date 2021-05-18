import { Route } from 'react-router-dom';
import { RouteTransaction } from './constants/route';
import Layout from './components/Layout';
import TableContainer from './containers/TableContainer';

function App(): JSX.Element {

  return (
    <Layout>
      <Route component={TableContainer} exact path={RouteTransaction}></Route>
    </Layout>
  );
}
export default App;