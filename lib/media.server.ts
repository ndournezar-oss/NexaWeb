import fs from "node:fs";
import path from "node:path";
import type { MediaFlags } from "@/lib/media";

/**
 * Détection (au build, côté serveur) des assets optionnels dans /public.
 * Permet de dégrader proprement (placeholder) sans jamais casser le build.
 */
function publicFileExists(relativePath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", relativePath));
  } catch {
    return false;
  }
}

export function getMediaFlags(): MediaFlags {
  return {
    formsImage: publicFileExists("media/forms.png"),
    screensImage: publicFileExists("media/screens.jpg"),
    blueTubes: publicFileExists("media/blue-tubes.png"),
    heroBg: publicFileExists("media/hero-bg.webp"),
  };
}
