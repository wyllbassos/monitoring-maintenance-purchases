import { Request, Response } from 'express';
import UpdateFieldComprasManutencaoService from '../services/comprasmanutencao/UpdateFieldComprasManutencaoService';

class ComprasManutencaoUpdateField {
  public async update(request: Request, response: Response): Promise<Response> {
    const { field, value } = request.body;
    const { fieldFilter, valueFilter } = request.params;

    const updateFieldComprasManutencaoService = new UpdateFieldComprasManutencaoService();
    const affected = await updateFieldComprasManutencaoService.execute({
      field,
      value,
      fieldFilter,
      valueFilter,
    });
    return response.json(affected);
  }
}

export default ComprasManutencaoUpdateField;
