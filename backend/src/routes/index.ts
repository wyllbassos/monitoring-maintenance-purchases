import { Router } from 'express';

import comprasManutencaoRouter from './compras-manutencao.routes';
import solicitantesRouter from './solicitantes.routes';
import tiposPagamentoRouter from './tipos-pagamento.routes';
import historicoAlteracoesRouter from './historico-alteracoes.routes';
import custosManutencaoRouter from './custos-manutencao.routes';

const routes = Router();

routes.use('/compras-manutencao', comprasManutencaoRouter);
routes.use('/solicitantes', solicitantesRouter);
routes.use('/tipos-pagamento', tiposPagamentoRouter);
routes.use('/historico-alteracoes', historicoAlteracoesRouter);
routes.use('/custos-manutencao', custosManutencaoRouter);

export default routes;
