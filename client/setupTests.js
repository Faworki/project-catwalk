// Does some set up work for enzyme before tests are run
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime'; // Had to add this for using puppeteer

configure({ adapter: new Adapter() });
