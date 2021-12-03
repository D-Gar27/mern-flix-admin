import './Home.scss';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import Chart from '../../components/chart/Chart';
import { activeUsers } from '../../data/data.js';
import Members from '../../components/members/Members';
import Transactions from '../../components/members/Transactions';

const Home = () => {
  return (
    <section className="navbar-margin home page">
      <div className="profit-container">
        <div className="profit revenue">
          <h4>Revenue</h4>
          <p className="money-rate">
            $ 2,638
            <span>
              <span>-4.5</span>
              <ArrowDownward className="arrow-down " />
            </span>
          </p>
          <p className="compared-to">Compared to last month</p>
        </div>
        <div className="profit sales">
          <h4>Sales</h4>
          <p className="money-rate">
            $ 4,238
            <span>
              <span>-8.9</span>
              <ArrowDownward className="arrow-down " />
            </span>
          </p>
          <p className="compared-to">Compared to last month</p>
        </div>
        <div className="profit cost">
          <h4>Costs</h4>
          <p className="money-rate">
            $ 3,374
            <span>
              <span>-2.7</span>
              <ArrowUpward className="arrow-up icon" />
            </span>
          </p>
          <p className="compared-to">Compared to last month</p>
        </div>
      </div>
      <Chart data={activeUsers} title="Users" grid dataKey="Active users" />
      <div className="members-transactions">
        <Members />
        <Transactions />
      </div>
    </section>
  );
};

export default Home;
