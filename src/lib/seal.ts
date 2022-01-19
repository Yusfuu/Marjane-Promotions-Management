import { sealData, unsealData } from "iron-session";

const password = process.env.MAGIC_LINK as string;

export const seal: Function = async (data: any): Promise<any> => sealData(data, { password });

export const unseal: Function = async (data: any): Promise<any> => unsealData(data, { password });
