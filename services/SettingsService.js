import { getRepository, getConnection } from 'typeorm';

import { SettingsModel } from '../db';

export default class SettingsService {
  static async getSettings() {
    try {
      let connection = await getConnection();
      const SettingsRepo = connection.getRepository(SettingsModel);
      const settings = await SettingsRepo.find();

      return settings.length ? settings[0] : null;
    } catch (e) {
      console.error("Error: " + e);
    }
  }

  static async initializeSettings() {
    let connection = await getConnection();
    const SettingsRepo = connection.getRepository(SettingsModel);

    // create settings instance
    const settings = new SettingsModel();

    // write to db
    await SettingsRepo.save(settings);

    return settings;
  }

  static async updateSettings({ id, ...settingsInfo }) {
    let connection = await getConnection();
    const SettingsRepo = connection.getRepository(SettingsModel);

    // save
    await SettingsRepo.update(id, settingsInfo);

    const updatedSettings = await SettingsRepo.findOne(id);

    return updatedSettings;
  }
}
