// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {supabase} from '@client/supabase';

export const sendOTP = async (email: string) => {
    const data = await supabase.auth.signInWithOtp({email});

    return data;
};
