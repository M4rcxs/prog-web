import axios from 'axios';

export default class ProductService {
    public static async getCep(cep: string): Promise<Object> {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
            return response.data;
        } catch (error) {
            return { error: 'CEP não encontrado ou erro na requisição.' };
        }
    }
}
