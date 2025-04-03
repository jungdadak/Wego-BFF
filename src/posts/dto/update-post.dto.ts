import { PartialType } from '@nestjs/swagger';
import { CreateReceivedDto } from './create.received.dto';

export class UpdatePostDto extends PartialType(CreateReceivedDto) {}
