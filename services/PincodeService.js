import { SecureStore } from 'expo-secure-store';

const SECURE_STORE_APP_PINCODE = 'app-pincode';
const SECURE_STORE_ACCOUNT_PINCODE = 'account-pincode';

const serviceTypes = {
  app: SECURE_STORE_APP_PINCODE,
  account: SECURE_STORE_ACCOUNT_PINCODE
};

export default class PincodeService {
  static async getPincode(type) {
    try {
      const service = serviceTypes[type];

      return await SecureStore.getItemAsync(service);
    } catch (e) {
      console.error("Error: " + e);
    }
  }

  static async validatePincode(pincode, type) {
    const service = serviceTypes[type];

    const storedPincode = await SecureStore.getItemAsync(service);

    if (pincode === storedPincode) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  }

  static async savePincode(pincode, type) {
    const service = serviceTypes[type];

    await SecureStore.setItemAsync(service, pincode);
  }
}
