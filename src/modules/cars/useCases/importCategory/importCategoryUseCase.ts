import { parse } from 'csv-parse';
import fs from 'fs';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) { }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      //cria uma stream de leitura
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();
      //pipe repassa o pedaço lido para dentro do parseFile
      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      })
        .on("end", () => {
          //após finalizado o catch dos dados, ele exclui o arquivo
          fs.promises.unlink(file.path)
          //resolve => ao finalizar a promise, envia os dados para o array
          resolve(categories)
        })
        .on("error", (err) => {
          reject(err);
        })
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(category => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };