// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {type Session} from '@supabase/supabase-js';
import {Navigation} from 'react-native-navigation';

import {supabase} from '@client/supabase';
import {CREATE_PROFILE_STACK, HOME_STACK, WELCOME_STACK} from '@constants/navigation';

import type {Slice} from './index';
import type {Database} from '@typings/supabase';
import type {StateCreator} from 'zustand';

interface SessionSlice {
    session: Session | null;
    setSession: (session: Session | null) => Promise<void>;
    signOut: () => Promise<void>;

    profile: Database['public']['Tables']['profiles']['Row'] | null;
    setProfile: (profile: Database['public']['Tables']['profiles']['Row'] | null) => void;
}

const createSessionSlice: StateCreator<Slice, [['zustand/immer', never]], [], SessionSlice> = (set) => ({
    session: null,
    profile: null,

    setSession: async (session) => {
        try {
            if (session) {
                set((state) => {
                    state.session = session;
                });

                const profile = await supabase.from('profiles').select().eq('user_id', session?.user.id || '');

                if (profile.error) {
                    throw new Error();
                }

                if (profile.data.length === 1) {
                    set((state) => {
                        state.profile = profile.data[0];
                    });
                    Navigation.setRoot(HOME_STACK);
                    return;
                }

                Navigation.setRoot(CREATE_PROFILE_STACK);
            } else {
                Navigation.setRoot(WELCOME_STACK);
            }
        } catch (e) {
            Navigation.setRoot(WELCOME_STACK);
        }
    },
    setProfile: (profile) => set((state) => {
        state.profile = profile;
    }),
    signOut: async () => {
        Navigation.setRoot(WELCOME_STACK);
        await supabase.auth.signOut();
        set((state) => {
            state.session = null;
            state.profile = null;
        });
    },
});

export {createSessionSlice};
export type {SessionSlice};
