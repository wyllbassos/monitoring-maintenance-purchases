import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateComprasManutencao1604879024928
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'compras_manutencao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'sc',
            type: 'varchar',
          },
          {
            name: 'item',
            type: 'varchar',
          },
          {
            name: 'produto',
            type: 'varchar',
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
          {
            name: 'quantidade',
            type: 'decimal',
          },
          {
            name: 'emissao',
            type: 'date',
          },
          {
            name: 'aplicacao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observacao',
            type: 'varchar',
            isNullable: true,
          },   
          {
            name: 'cotacao',
            type: 'varchar',
            isNullable: true,
          },   
          {
            name: 'pc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dt_aprovacao_n1',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'dt_aprovacao_n2',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'dt_aprovacao_n3',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'quantidade_ja_entregue',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'ja_emitiu_fornecedor',
            type: 'enum',
            enum: ['S'],
            isNullable: true,
          },
          {
            name: 'valor_total',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'status_sc',
            type: 'enum',
            enum: ['B', 'L', 'R'],
          },
          {
            name: 'status_pc',
            type: 'enum',
            enum: ['B', 'L', 'R'],
            isNullable: true,
          },
          {
            name: 'previsao_entrega',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'pc_eliminado_residuo',
            type: 'enum',
            enum: ['S'],
            isNullable: true,
          },
          {
            name: 'motivo_eliminado_residuo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sc_eliminado_residuo',
            type: 'enum',
            enum: ['S'],
            isNullable: true,
          },
          {
            name: 'data_pc',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'conta_pc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'centro_custo_pc',
            type: 'varchar',
            isNullable: true,
          }, 
          {
            name: 'solicitante',
            type: 'varchar',
          }, 
          {
            name: 'requisitante',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fornecedor',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'forma_pagamento',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pagamento_antecipado',
            type: 'enum',
            enum: ['S'],
            isNullable: true,
          },
          {
            name: 'area',
            type: 'enum',
            enum: ['PCM', 'ALMOX', 'PRODUCAO', 'OUTROS'],
            isNullable: true,
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
    await queryRunner.dropTable('compras_manutencao');
  }
}
