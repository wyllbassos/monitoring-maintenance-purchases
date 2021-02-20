import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPrioridadeOnComprasManutencao1609286144167
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'compras_manutencao',
      new TableColumn({
        name: 'prioridade',
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('compras_manutencao', 'prioridade');
  }
}
