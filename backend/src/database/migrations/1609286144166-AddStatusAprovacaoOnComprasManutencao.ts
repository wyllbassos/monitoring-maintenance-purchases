import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddStatusAprovacaoOnComprasManutencao1609286144166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.addColumn('compras_manutencao', new TableColumn({
        name: 'status_aprovacao',
        type: 'varchar',
        isNullable: true,
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropColumn('compras_manutencao', 'status_aprovacao');
    }
}
