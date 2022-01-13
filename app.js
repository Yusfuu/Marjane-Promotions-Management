import express from "express";
import cookieParser from 'cookie-parser';
import { adminRouter, apiAdminRouter, apiAuthRouter, apiManagerRouter, apiSubadminRouter, callbackRouter, managerRouter, subadminRouter } from "./src/routes";
import { session } from './src/lib/session';
import 'dotenv/config';
import { isAuthenticated } from "./src/middleware";

const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session);

app.get('/', (req, res) => res.render('pages/home'));
app.get('/account/login', isAuthenticated(), (req, res) => res.render('pages/login'));

app.use('/api/admin', apiAdminRouter);
app.use('/admin', adminRouter);

app.use('/api/subadmin', apiSubadminRouter);
app.use('/subadmin', subadminRouter);

app.use('/api/manager', apiManagerRouter);
app.use('/manager', managerRouter);

app.use('/api/account', apiAuthRouter);
app.use('/callback', callbackRouter);


app.listen(3000, () => {
  console.log(`🚀 Server ready at: http://localhost:3000`)
});