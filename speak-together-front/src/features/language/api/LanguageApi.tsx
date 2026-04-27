import type { UserLanguageDto } from "../LanguageTypes";
import type { UserLanguagePreferenceDto } from "../LanguageTypes";

import axios from 'axios';

export const chooseLanguage = async (
    data: UserLanguageDto[],
    token: string
) => {
    const response = await axios.post(
        "https://localhost:7173/user/add-new-language",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const choosePreferences = async (
    data: UserLanguagePreferenceDto[],
    token: string
) => {
    const response = await axios.post(
        "https://localhost:7173/user/add-language-preference",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};