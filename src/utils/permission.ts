// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {check, request, RESULTS, type Permission} from 'react-native-permissions';

export const canUsePermission = async (permission: Permission, onDeniedOrBlocked?: () => void) => {
    let finalResult: boolean = false;
    const result = await check(permission);
    finalResult = result === RESULTS.GRANTED;

    if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        finalResult = requestResult === RESULTS.GRANTED;

        if (requestResult === RESULTS.BLOCKED || requestResult === RESULTS.DENIED) {
            onDeniedOrBlocked?.();
        }
    }

    return finalResult;
};
