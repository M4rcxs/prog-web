

import axios from 'axios';

export default class ProductService {
    public static async getCep(cep: string): Promise<Object> {
        console.log("####")
        try {
            // Substitui {cep} pelo valor real passado como argumento
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
            // Retorna o endereço encontrado
            return response.data;
        } catch (error) {
            // Trata erros de requisição
            return { error: 'CEP não encontrado ou erro na requisição.' };
        }
    }
}
