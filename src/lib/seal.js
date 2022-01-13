import { sealData, unsealData } from "iron-session";

const password = process.env.MAGIC_LINK;

export const seal = async data => sealData(data, { password });

export const unseal = async data => unsealData(data, { password });
