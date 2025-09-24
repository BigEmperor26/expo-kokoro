import { Asset } from "expo-asset";

export const KokoroVoices = [
  // American Female
  "alloy",
  "aoede",
  "bella",
  "heart",
  "jessica",
  "kore",
  "nicole",
  "nova",
  "river",
  "sarah",
  "sky",

  // American Male
  "adam",
  "echo",
  "eric",
  "fenrir",
  "liam",
  "michael",
  "onyx",
  "puck",
  "santa",

  // British Female
  "alice",
  "emma",
  "isabella",
  "lily",

  // British Male
  "daniel",
  "fable",
  "george",
  "lewis",

  // Foreign Female/Male
  "siwis",

  // Human/Hybrid weirdos
  "alpha",
  "beta",
  "omega",
  "psi",

  // Italian Female/Male
  "sara",
  "nicola",

  // Japanese Female/Male
  "jf_alpha",
  "gongitsune",
  "nezumi",
  "tebukuro",
  "kumo",

  // Portuguese Female/Male
  "dora",
  "alex",

  // Chinese Female/Male
  "xiaobei",
  "xiaoni",
  "xiaoxiao",
  "xiaoyi",
  "yunjian",
  "yunxi",
  "yunxia",
  "yunyang"
] as const;

export type KokoroVoice = typeof KokoroVoices[number];

const VOICE_ASSETS: Record<KokoroVoice, number> = {
  // American Female
  alloy: require("./voices/af_alloy.bin"),
  aoede: require("./voices/af_aoede.bin"),
  bella: require("./voices/af_bella.bin"),
  heart: require("./voices/af_heart.bin"),
  jessica: require("./voices/af_jessica.bin"),
  kore: require("./voices/af_kore.bin"),
  nicole: require("./voices/af_nicole.bin"),
  nova: require("./voices/af_nova.bin"),
  river: require("./voices/af_river.bin"),
  sarah: require("./voices/af_sarah.bin"),
  sky: require("./voices/af_sky.bin"),

  // American Male
  adam: require("./voices/am_adam.bin"),
  echo: require("./voices/am_echo.bin"),
  eric: require("./voices/am_eric.bin"),
  fenrir: require("./voices/am_fenrir.bin"),
  liam: require("./voices/am_liam.bin"),
  michael: require("./voices/am_michael.bin"),
  onyx: require("./voices/am_onyx.bin"),
  puck: require("./voices/am_puck.bin"),
  santa: require("./voices/am_santa.bin"),

  // British Female
  alice: require("./voices/bf_alice.bin"),
  emma: require("./voices/bf_emma.bin"),
  isabella: require("./voices/bf_isabella.bin"),
  lily: require("./voices/bf_lily.bin"),

  // British Male
  daniel: require("./voices/bm_daniel.bin"),
  fable: require("./voices/bm_fable.bin"),
  george: require("./voices/bm_george.bin"),
  lewis: require("./voices/bm_lewis.bin"),

  // Foreign Female
  siwis: require("./voices/ff_siwis.bin"),

  // Hybrid freak show
  alpha: require("./voices/hf_alpha.bin"),
  beta: require("./voices/hf_beta.bin"),
  omega: require("./voices/hm_omega.bin"),
  psi: require("./voices/hm_psi.bin"),

  // Italian
  sara: require("./voices/if_sara.bin"),
  nicola: require("./voices/im_nicola.bin"),

  // Japanese
  jf_alpha: require("./voices/jf_alpha.bin"),
  gongitsune: require("./voices/jf_gongitsune.bin"),
  nezumi: require("./voices/jf_nezumi.bin"),
  tebukuro: require("./voices/jf_tebukuro.bin"),
  kumo: require("./voices/jm_kumo.bin"),

  // Portuguese
  dora: require("./voices/pf_dora.bin"),
  alex: require("./voices/pm_alex.bin"),

  // Chinese
  xiaobei: require("./voices/zf_xiaobei.bin"),
  xiaoni: require("./voices/zf_xiaoni.bin"),
  xiaoxiao: require("./voices/zf_xiaoxiao.bin"),
  xiaoyi: require("./voices/zf_xiaoyi.bin"),
  yunjian: require("./voices/zm_yunjian.bin"),
  yunxi: require("./voices/zm_yunxi.bin"),
  yunxia: require("./voices/zm_yunxia.bin"),
  yunyang: require("./voices/zm_yunyang.bin"),
};

export async function load_voice_data(voice: KokoroVoice): Promise<Float32Array> {
  const asset = Asset.fromModule(VOICE_ASSETS[voice]);
  if (!asset.downloaded) {
    await asset.downloadAsync();
  }
  const uri = asset.localUri ?? asset.uri;
  const res = await fetch(uri);
  const buf = await res.arrayBuffer();
  return new Float32Array(buf);
}
