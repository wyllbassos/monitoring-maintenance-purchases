import { Router } from 'express';

import comprasManutencaoRouter from './compras-manutencao.routes';

const routes = Router();

routes.use('/compras-manutencao', comprasManutencaoRouter);

export default routes;
