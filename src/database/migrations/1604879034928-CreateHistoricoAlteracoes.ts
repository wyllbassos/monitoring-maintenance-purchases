import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class  CreateHistoricoAlteracoes1604879034928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hitorico_alteracoes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'tabela_alterada_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'tabela',
            type: 'varchar',
          },
          {
            name: 'campo',
            type: 'varchar',
          },
          {
            name: 'valor_antigo',
            type: 'varchar',
          },
          {
            name: 'valor_novo',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('hitorico_alteracoes');
  }
}
