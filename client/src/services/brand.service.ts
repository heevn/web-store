import { $authHost, $host } from ".";
import { DeviceBrand } from "../store/slices/brandSlice";

class BrandService {
  async fetchBrands() {
    const {data} = await $host.get('api/brand');
    return data;
  }

  async createBrand(brand? : string ) {
    const {data} = await $authHost.post<DeviceBrand>('api/brand', 
      {
        name: brand
      }
    );
    return data;
  }

  async deleteBrand(brand? : string) {
    const {data} = await $authHost.delete('api/brand',
      {
        data: {
          name: brand
        }
      }
    );
    return data;
  }
}

export default new BrandService()