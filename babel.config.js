// Copyright (c) 2023-present Vibes, Inc. All Rights Reserved.
module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        '@babel/plugin-transform-private-methods',
        'react-native-reanimated/plugin',
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@screens': './src/screens',
                    '@init': './src/init',
                    '@constants': './src/constants',
                    '@components': './src/components',
                    '@assets': './src/assets',
                    '@utils': './src/utils',
                    '@client': './src/client',
                    '@storage': './src/storage',
                    '@global': './src/global',
                    '@hooks': './src/hooks',
                    '@typings': './src/typings',
                },
            },
        ],
    ],
};
