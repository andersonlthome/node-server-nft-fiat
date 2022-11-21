export interface ProjectParams {
  id?: number;
  name: string;
  description?: string;
  url?: string;
  tokens: TokenParams[];
}

export interface TokenParams {
  id?: number;
  name?: string;
  symbol?: string;
  standard?: string;
  address: string;
  network: number;
  decimals?: number;
}

