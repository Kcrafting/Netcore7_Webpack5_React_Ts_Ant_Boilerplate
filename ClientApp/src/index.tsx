import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { App } from './App'
import configureStore from './store/configureStore';
import { HistoryRouter } from "redux-first-history/rr6";
import { createBrowserHistory, BrowserHistory } from 'history';
const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(    
<Provider store={store}> 
    <HistoryRouter history={history}>
        <App /> 
    </HistoryRouter>
</Provider>, 
document.getElementById('root'))
