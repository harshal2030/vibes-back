// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {createClient} from '@supabase/supabase-js';
import Config from 'react-native-config';

import {localStorage} from '@storage/mmkv';
import {type Database} from '@typings/supabase';

const supabase = createClient<Database>(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY, {
    auth: {
        storage: localStorage,
    },
});

export {supabase};
