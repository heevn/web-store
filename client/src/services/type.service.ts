import { $authHost, $host } from ".";
import { DeviceType } from "../store/slices/typeSlice";

class TypeService {
  async fetchTypes() {
    const {data} = await $host.get('api/type');
    return data;
  }

  async createType(typeName? : string) {
    const {data} = await $authHost.post<DeviceType>('api/type',
      {
        name: typeName
      }
    );
    return data;
  }

  async deleteType(typeName? : string) {
    const {data} = await $authHost.delete('api/type', 
      { 
        data: {
          name: typeName
        }
      }
    );
    return data;
  }
}

export default new TypeService()