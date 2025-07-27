import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class SafeStringPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('Il parametro deve essere una stringa');
    }

    // Eliminazione degli spazi vuoti per poter controllare la stringa 
    // (se la stringa è vuota allora viene tolto tutto il contenuto e la lunghezza è pari a 0)
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new BadRequestException('Il parametro non può essere vuoto');
    }

    // Regex: blocca caratteri SQL injection o pericolosi
    const dangerousPattern = /[;"'`\\]/;
    if (dangerousPattern.test(trimmed)) {
      throw new BadRequestException('Il parametro contiene caratteri non validi');
    }

    return trimmed;
  }
}