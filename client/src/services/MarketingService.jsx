import { isAxiosError } from 'axios';
import { z, ZodError } from 'zod';
import axiosInstance from '../config/axiosInstance';

class MarketingService {
  #handleError = (error) => {
    let message = 'Неизвестная ошибка';
    if (error instanceof ZodError) {
      message = 'Ошибка валидации ZoD';
      console.log('Ошибка ZOD', error.issues);
    } else if (isAxiosError(error)) {
      message = 'Ошибка при запросе';
      console.log(
        'Ошибка при запросе. Статус:',
        error.response?.status,
        'Данные:',
        error.response?.data,
      );
    } else {
      message = 'Неизвестная ошибка';
      console.log(error);
    }
  };

  async getAll() {
    try {
      const response = await axiosInstance('/marketing');
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async getOne(id) {
    try {
      const response = await axiosInstance(`/marketing/${id}`);
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      const advertSchema = z.object({
          id: z.number(),
          model: z.string(),
          description: z.string(),
          image: z.string(),
        });
      return advertSchema.parse(response.data);
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async create(formData) {
    try {
      const response = await axiosInstance.post('/marketing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Устанавливаем правильный Content-Type
        }
      });
      if (response.status !== 201)
        throw new Error('Неверный статус при добавлении (ожидался 201)');
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async update(id,updateAdvert) {
    try {
      const response = await axiosInstance.put(`/marketing/${id}`, updateAdvert);
      if (response.status !== 201)
        throw new Error('Неверный статус при обновлении (ожидался 201)');
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await axiosInstance.delete(`/marketing/${id}`);
      if (response.status !== 200)
        throw new Error("Неверный статус при удалении (ожидался 200)");
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }
}

const marketingService=new MarketingService()

export default marketingService;
