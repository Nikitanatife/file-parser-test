import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as yaml from 'js-yaml';
// import * as fs from 'fs/promises';
// import * as path from 'path';

@Injectable()
export class AppService {
  async processUploadedFile(file: Express.Multer.File) {
    try {
      const data = file.buffer.toString();
      // const outputPath = path.join(__dirname, '../', 'temp', 'output.yaml');

      const dataYaml = await this.convertTextToYaml(data);
      const dataJs = yaml.load(dataYaml);

      console.log(dataJs);

      return dataJs;
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }

  private async convertTextToYaml(data: string): Promise<string> {
    const result = data
      .replace('E-List', 'e-list:')
      .replace(/^\s{2}Employee.*$/gm, '- employee:')
      .replace(/^\s{4}Department.*$/gm, '- department:')
      .replace(/^\s{4}Salary.*$/gm, '- salary:')
      .replace(/^\s{6}Statement.*$/gm, '    - statement:')
      .replace(/^\s{4}Donation.*$/gm, '- donation:')
      .replace('Rates', 'rates:')
      .replace(/^\s{2}Rate.*$/gm, '- rate:');

    // await fs.writeFile(outputPath, result);
    return result;
  }
}
