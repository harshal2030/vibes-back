// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {useState} from 'react';

export const useField = <T>(initialValue: T, validator?: (v: T) => string | null) => {
    const [value, setValue] = useState<T>(initialValue);
    const [error, setError] = useState<string | null>(null);

    const onChangeText = (data: T) => {
        setValue(data);
        setError(validator?.(data) || null);
    };
    const runValidator = () => {
        const errMsg = validator?.(value) || null;

        setError(errMsg);
        return errMsg;
    };

    return {value, error, onChangeText, runValidator, setError, vanillaChange: setValue};
};
