import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { SplashScreen } from '@capacitor/splash-screen';

window.GroceryNative = {
  isNative() {
    try { return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()); }
    catch (_) { return false; }
  },
  async saveAndShare(name, base64, mimeType) {
    const safeName = String(name || 'grocery-export.bin').replace(/[\\/:*?"<>|]/g, '_');
    const saved = await Filesystem.writeFile({
      path: safeName,
      data: base64,
      directory: Directory.Cache,
      recursive: true
    });
    await Share.share({
      title: safeName,
      text: `Grocery Tracker export: ${safeName}`,
      url: saved.uri,
      dialogTitle: 'Save or share file'
    });
    return { uri: saved.uri, mimeType };
  },
  async hideSplash() {
    try { await SplashScreen.hide({ fadeOutDuration: 250 }); } catch (_) {}
  }
};
