import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { Prescription } from './entities/prescription.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prescription, Customer])],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
