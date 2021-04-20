import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarFieldToUsers1615159468588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.addColumn(
          'users',
          new TableColumn({
             name: 'avatar',
             type: 'varchar',
             isNullable: true, // como já existem registros na tabela ele não pode ser não nulo
          }),
       );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn('users','avatar');
    }

}
