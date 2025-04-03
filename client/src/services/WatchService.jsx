import { isAxiosError } from 'axios';
import { z, ZodError } from 'zod';
import axiosInstance from '../config/axiosInstance';

class WatchService {
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

  async getAllWatch() {
    try {
      const response = await axiosInstance('/watch');
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async getOneWatch(id) {
    try {
      const response = await axiosInstance(`/watch/${id}`);
      if (response.status !== 200) throw new Error('Неверный статус (ожидался 200)');
      const watchSchema = z.object({
          id: z.number(),
          model: z.string(),
          description: z.string(),
          image: z.string(),
        });
      return watchSchema.parse(response.data);
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async createWatch(newWatch) {
    try {
      const response = await axiosInstance.post('/watch', { ...newWatch });
      if (response.status !== 201)
        throw new Error('Неверный статус при добавлении (ожидался 201)');
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async updateWatch(watchId,updateWatch) {
    try {
      const response = await axiosInstance.put(`/watch/${watchId}`, updateWatch);
      if (response.status !== 201)
        throw new Error('Неверный статус при обновлении (ожидался 201)');
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }

  async deleteWatch(watchId) {
    try {
      const response = await axiosInstance.delete(`/watch/${watchId}`);
      if (response.status !== 200)
        throw new Error("Неверный статус при удалении (ожидался 200)");
      return response.data;
    } catch (error) {
      this.#handleError(error);
      throw error;
    }
  }
}

const watchService=new WatchService()

export default watchService;
