// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {type Slice, createSessionSlice} from './slice';

export const useStore = create(immer<Slice>((...a) => ({
    ...createSessionSlice(...a),
})));
