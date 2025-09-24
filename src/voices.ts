import { Asset } from "expo-asset";
import VoiceIndex from "./voices/index.json";

export interface KokoroVoice {
  id: string;
  name: string;
  nationality: string;
  gender: string;
}

export const KokoroVoices = Object.values(VoiceIndex) as Array<KokoroVoice>;

function load_voices(voices: Array<KokoroVoice>): Record<string, number> {
  const voiceMap: Record<string, number> = {};

  voices.forEach((voice) => {
    voiceMap[voice.id] = require(`./voices/${voice.id}.bin`);
  });

  return voiceMap;
}

const VOICE_ASSETS: Record<string, number> = load_voices(KokoroVoices);

export async function load_voice_data(voice: KokoroVoice): Promise<Float32Array> {
  const asset = Asset.fromModule(VOICE_ASSETS[voice.id]);
  if (!asset.downloaded) {
    await asset.downloadAsync();
  }
  const uri = asset.localUri ?? asset.uri;
  const res = await fetch(uri);
  const buf = await res.arrayBuffer();
  return new Float32Array(buf);
}
