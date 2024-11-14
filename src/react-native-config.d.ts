// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
declare module 'react-native-config' {
  export interface NativeConfig {
      SUPABASE_ANON_KEY: string;
      SUPABASE_URL: string;
      STORAGE_ENCRYPTION_KEY: string;
      API_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
