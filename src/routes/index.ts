import { Router } from 'express';

import comprasManutencaoRouter from './compras-manutencao.routes';
import solicitantesRouter from './solicitantes.routes';
import tiposPagamentoRouter from './tipos-pagamento.routes';

const routes = Router();

routes.use('/compras-manutencao', comprasManutencaoRouter);
routes.use('/solicitantes', solicitantesRouter);
routes.use('/tipos-pagamento', tiposPagamentoRouter);

export default routes;
