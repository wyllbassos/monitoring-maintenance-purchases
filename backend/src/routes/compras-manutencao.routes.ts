import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import ComprasManutencaoImportController from '../controllers/ComprasManutencaoImportController';
import ComprasManutencaoController from '../controllers/ComprasManutencaoController';
import ComprasManutencaoFilterController from '../controllers/ComprasManutencaoFilterController';
import ComprasManutencaoRelatorioController from '../controllers/ComprasManutencaoRelatorioController';
import ComprasManutencaoUpdateField from '../controllers/ComprasManutencaoUpdateField';
import ComprasManutencaoAtualizarController from '../controllers/ComprasManutencaoAtualizarController';

const comprasManutencaoImportController = new ComprasManutencaoImportController();
const comprasManutencaoController = new ComprasManutencaoController();
const comprasManutencaoFilterController = new ComprasManutencaoFilterController();
const comprasManutencaoRelatorioController = new ComprasManutencaoRelatorioController();
const comprasManutencaoUpdateField = new ComprasManutencaoUpdateField();
const comprasManutencaoAtualizarController = new ComprasManutencaoAtualizarController();

const comprasManutencaoRouter = Router();
const upload = multer(uploadConfig);

comprasManutencaoRouter.get('/filter', comprasManutencaoFilterController.show);

comprasManutencaoRouter.get(
  '/:relatorio',
  comprasManutencaoRelatorioController.show,
);

comprasManutencaoRouter.post('/', comprasManutencaoController.create);
comprasManutencaoRouter.post(
  '/atualizar',
  comprasManutencaoAtualizarController.create,
);

comprasManutencaoRouter.delete('/:id', comprasManutencaoController.delete);

comprasManutencaoRouter.post(
  '/import',
  upload.single('file'),
  comprasManutencaoImportController.create,
);

comprasManutencaoRouter.patch(
  '/:fieldFilter/:valueFilter',
  comprasManutencaoUpdateField.update,
);

export default comprasManutencaoRouter;
