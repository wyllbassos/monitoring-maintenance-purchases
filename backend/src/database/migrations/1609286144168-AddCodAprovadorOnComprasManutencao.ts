import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCodAprovadorOnComprasManutencao1609286144168
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'compras_manutencao',
      new TableColumn({
        name: 'cod_aprovador_n1',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'compras_manutencao',
      new TableColumn({
        name: 'cod_aprovador_n2',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'compras_manutencao',
      new TableColumn({
        name: 'cod_aprovador_n3',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('compras_manutencao', 'cod_aprovador_n3');
    await queryRunner.dropColumn('compras_manutencao', 'cod_aprovador_n2');
    await queryRunner.dropColumn('compras_manutencao', 'cod_aprovador_n1');
  }
}
