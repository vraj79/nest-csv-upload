import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from "@nestjs/platform-express";
import csvParser from 'csv-parser';
import * as fs from "fs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/upload")
  @UseInterceptors(FileInterceptor("csv"))
  uploadFile(@UploadedFile() csv: Express.Multer.File): object {
    console.log(csv)
    return {
      message: "File uploaded successfully"
    }
  }

  @Post("/upload-csv")
  @UseInterceptors(FileInterceptor("csv"))
  uploadCSVFile(@UploadedFile() csv: Express.Multer.File): object {
    // readng the file
    const csvContent = fs.readFileSync(`./${csv.destination}/${csv.filename}`, "utf-8");
    // Split the CSV content by newline to get individual rows
    const rows = csvContent.split('\n');
    // Get the first row (header row) and split it by comma to get the columns
    const columns = rows[0].split(',');

    // Calculate the number of columns
    const columnCount = columns.length;

    console.log('Number of columns:', columnCount);

    return {
      message: 'File uploaded successfully',
      columnCount,
    };
  }
}
