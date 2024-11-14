// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import Config from 'react-native-config';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
    id: 'vibes',
    encryptionKey: Config.STORAGE_ENCRYPTION_KEY,
});

export const localStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        return storage.getString(key);
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
};
