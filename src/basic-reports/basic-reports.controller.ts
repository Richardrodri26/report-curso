import { Controller, Get, Param, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-mundo.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'employment-letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employmentId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employmentId') employmentId: string,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(+employmentId);

    response.setHeader('Content-type', 'application/pdf');
    pdfDoc.info.Title = 'employment-letter.pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
