import 'dotenv/config';
import express, { Request, Response } from "express";
import { session } from '@lib/session';
import { isAuthenticated } from "@middlewares/auth";

import { adminRouter, apiAdminRouter, apiAuthRouter, apiManagerRouter, apiSubadminRouter, callbackRouter, managerRouter, subadminRouter } from "@routes/index";


const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(session);

app.get('/', (req: Request, res: Response): void => res.render('pages/home'));

app.get('/account/login', isAuthenticated(), (req: Request, res: Response) => res.render('pages/login'));

// app.use('/api/admin', apiAdminRouter);
// app.use('/admin', adminRouter);

// app.use('/api/subadmin', apiSubadminRouter);
// app.use('/subadmin', subadminRouter);

// app.use('/api/manager', apiManagerRouter);
// app.use('/manager', managerRouter);

// app.use('/api/account', apiAuthRouter);
// app.use('/callback', callbackRouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server ready at: ${process.env.APP_HOST}:${port}`);
});
