import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  images: Express.Multer.File[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImageRepository: ICarImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images }: IRequest): Promise<void> {
    images.forEach(async (image) => {
      await this.carImageRepository.create(car_id, image.filename);
      await this.storageProvider.save(image.filename, "cars");
    });
  }
}

export { UploadCarImagesUseCase };
