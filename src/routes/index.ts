import { Router } from 'express';

import comprasManutencaoRouter from './compras-manutencao.routes';
import solicitantesRouter from './solicitantes.routes';

const routes = Router();

routes.use('/compras-manutencao', comprasManutencaoRouter);
routes.use('/solicitantes', solicitantesRouter);

export default routes;
