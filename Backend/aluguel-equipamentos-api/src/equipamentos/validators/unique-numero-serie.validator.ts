import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { EquipamentosService } from '../equipamentos.service';
  
  @ValidatorConstraint({ name: 'IsNumeroSerieUnique', async: true })
  @Injectable()
  export class IsNumeroSerieUniqueValidator implements ValidatorConstraintInterface {
    constructor(private equipamentosService: EquipamentosService) {}
  
    async validate(numeroSerie: string, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const id = (args.object as any)[relatedPropertyName];
      
      try {
        // const exists = await this.equipamentosService.checkNumeroSerieExists(numeroSerie, id);
        // return !exists;
        return true;
      } catch (e) {
        return false;
      }
    }
  
    defaultMessage(args: ValidationArguments) {
      return `O número de série ${args.value} já está em uso`;
    }
  }
  
  export function IsNumeroSerieUnique(idField: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [idField],
        validator: IsNumeroSerieUniqueValidator,
      });
    };
  }